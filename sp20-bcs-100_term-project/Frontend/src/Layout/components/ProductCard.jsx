import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ProductCard(props) {
  return (
    <Card style={{ width: "18rem", border: "none" }}>
      <Card.Img
        variant="top"
        src="https://images.freeimages.com/images/large-previews/4aa/grace-1540543.jpg"
      />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>Catogery:{props.catogery}</Card.Text>
        <Card.Text>Price:{props.price}</Card.Text>
        <Card.Text>Discount:{props.discount}</Card.Text>
        <Button variant="primary">Update</Button>
        <Button variant="danger">Delete</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
