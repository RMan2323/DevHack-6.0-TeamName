import ItemList from "../components/ItemList";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>IIT Dharwad Marketplace</h1>
      <ItemList />
    </div>
  );
};

export default Home;