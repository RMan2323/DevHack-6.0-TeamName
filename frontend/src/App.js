import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CreateListing from "./pages/CreateListing";
import ItemDetail from "./pages/ItemDetail";
import "./styles.css";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateListing />} />
        <Route path="/item/:id" element={<ItemDetail />} />
      </Routes>
    </Router>
  );
};

export default App;