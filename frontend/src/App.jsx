import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import About from "../pages/About";
import ProtectedRoute from "../components/ProtectedRoute";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Collections from "../pages/Collections";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            {/* <Route path="/account" element={<Accoun />} /> */}
            {/* <Route path="/orders" element={<Orders />} /> */}
            {/* <Route path="/wishlist" element={<Wishlis />} /> */}
          </Route>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
