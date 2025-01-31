import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import BuyPage from './pages/BuyPage';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import SellPage from './pages/SellPage';
import ViewTripsPage from './pages/ViewTripsPage';
import AddTripPage from './pages/AddTripPage';
function Buy() {
  return <h2>Buy Page</h2>;
}

function Sell() {
  return <h2>Sell Page</h2>;
}

function Carpool() {
  return <h2>Carpool Page</h2>;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/sell" element={<SellPage />} />
        <Route path="/view-trips" element={<ViewTripsPage />} />
        <Route path="/add-trip" element={<AddTripPage />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/carpool" element={<Carpool />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
