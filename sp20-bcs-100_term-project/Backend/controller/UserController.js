const Users = require("../database/models/UserModel");
const ErrorHandler = require("../utilis/errorHandling");
const CatchErrors = require("../middleware/catchAsyncError");
const sendToken = require("../utilis/jwtToken");
const sendEmail = require("../utilis/sendEmail");
const crypto = require("crypto");

exports.registerUser = CatchErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await Users.create({
    name,
    email,
    password,
    avatar: {
      public_id: "avatarImageId",
      url: "profileUrl",
    },
  });

  sendToken(user, 201, res);
});

exports.loginUser = CatchErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  // Finding user in database
  const user = await Users.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  // Check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});

exports.logoutUser = CatchErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

exports.getUserProfile = CatchErrors(async (req, res, next) => {
  const user = await Users.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.forgetPassword = CatchErrors(async (req, res, next) => {
  const user = await Users.findOne({
    email: req.body.email,
  });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;
  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: user.email,
      subject: "ReviewLoveFood Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = CatchErrors(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await Users.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  // Setup new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

exports.updatePassword = CatchErrors(async (req, res, next) => {
  const user = await Users.findById(req.user.id).select("+password");

  // Check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

exports.updateProfile = CatchErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Update avatar: TODO

  const user = await Users.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// ADMIN ROUTES

// get all users => /api/v1/admin/users

exports.allUsers = CatchErrors(async (req, res, next) => {
  const user = await Users.find();

  res.status(200).json({
    success: true,
    user,
  });
});

// get user details => /api/v1/admin/user/:id

exports.getUserDetails = CatchErrors(async (req, res, next) => {
  const user = await Users.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update user profile => /api/v1/admin/user/:id

exports.updateUser = CatchErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await Users.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// delete user => /api/v1/admin/user/:id

exports.deleteUser = CatchErrors(async (req, res, next) => {
  const user = await Users.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`)
    );
  }

  // Remove avatar from cloudinary: TODO

  await user.remove();

  res.status(200).json({
    success: true,
  });
});
