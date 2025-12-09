import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login/Login.jsx";
import ProductDetail from "./ProductDetail/ProductDetail.jsx";
import Home from "../Home/Home.jsx";
import FavoriteList from '../Favorites/FavoriteList/FavoriteList.jsx';
import SignUp from "../Main/SignUp/SignUp.jsx";


const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id?" element={<ProductDetail />} />
        <Route path="/favorites" element={<FavoriteList />} />
        <Route path="/signup" element={<SignUp />} />
        
      </Routes>
    </main>
  );
};

export default Main;
