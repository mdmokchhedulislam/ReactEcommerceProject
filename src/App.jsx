import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./Layout/MainLayout";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Signup from "./pages/Register";
import Cart from "./pages/Cart";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
