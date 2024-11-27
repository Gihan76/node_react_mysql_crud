import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Home } from "./components/Home";
import { AddStudent } from "./components/AddStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/add" element={<AddStudent/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
