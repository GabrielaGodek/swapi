import Card from "react-bootstrap/Card";

export const Item = ({ title, child }) => {
  return (
    <Card style={{ width: "200px" }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {child}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
