import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/pages/Login";
import ProductsPage from './components/pages/ProductsPage';
import Layout from './components/Layout';
import TodoPage from "./components/pages/TodoPage";
import CartPage from "./components/pages/CartPage";
import Safelogin from "./components/Safelogin";
import Logout from "./components/logout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Safelogin />}>
          <Route element={<Layout />}>
            <Route path="/Dashboard" />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/todo" element={<TodoPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}
export default App;