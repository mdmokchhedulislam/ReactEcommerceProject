import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./Layout/MainLayout";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Signup from "./pages/Register";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
