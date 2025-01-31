import "./ItemCard.css";

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <img src={item.images[0]} alt={item.title} />
      <h3>{item.title}</h3>
      <p>${item.price}</p>
      <p>{item.location}</p>
      <button>View Details</button>
    </div>
  );
};

export default ItemCard;
