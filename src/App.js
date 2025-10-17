// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";  // tu app delivery
import MenuQR from "./pages/MenuQR"; // tu nuevo menú QR

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/menu-digital" element={<MenuQR />} />
    </Routes>
  );
}
