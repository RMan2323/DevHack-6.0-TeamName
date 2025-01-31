import { useParams } from "react-router-dom";
import { mockItems } from "../mockData";
import "./ItemDetail.css";

const ItemDetail = () => {
  const { id } = useParams();
  const item = mockItems.find((item) => item.id === parseInt(id));

  if (!item) return <div>Item not found</div>;

  return (
    <div className="item-detail">
      <h1>{item.title}</h1>
      <img src={item.images[0]} alt={item.title} />
      <p>${item.price}</p>
      <p>{item.description}</p>
      <p>Location: {item.location}</p>
    </div>
  );
};

export default ItemDetail;