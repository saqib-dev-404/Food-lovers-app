






































// import React, { useEffect, useState } from "react";
// import ProductCard from "../components/ProductCard";
// import axios from "axios";

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/api/v1/products")
//       .then((res) => setProducts(res.data.products))
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div className="container">
//       <h1 className="text-center " variant="primary">
//         Products
//       </h1>
//       <div className="row gap-5">
//         {products.map((prod) => {
//           return (
//             <ProductCard
//               catogery={prod.category}
//               price={prod.price}
//               discount={prod.discount}
//               title={prod.name}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }
