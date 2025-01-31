import CreateItem from "../components/CreateItem";
import "./CreateListing.css";

const CreateListing = () => {
  return (
    <div className="create-listing">
      <h1>Sell Your Item</h1>
      <CreateItem />
    </div>
  );
};

export default CreateListing;