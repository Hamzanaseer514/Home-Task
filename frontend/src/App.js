import React from "react";
import Login from "./Components/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Products from "./Components/Products";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/login" element={<Login />} />
       <Route path="/signup" element={<Signup />} />
       <Route path="/" element={<Products />} />
      
      </Routes>
    </BrowserRouter>
  );
};

export default App;
