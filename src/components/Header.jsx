import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/create">Sell Item</Link>
      </nav>
    </header>
  );
};

export default Header;