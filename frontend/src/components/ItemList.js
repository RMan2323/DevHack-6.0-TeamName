import { useState } from "react";
import ItemCard from "./ItemCard";
import { mockItems } from "./mockData";
import "./ItemList.css";

const ItemList = () => {
  const [items] = useState(mockItems);

  return (
    <div className="item-list">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemList;
