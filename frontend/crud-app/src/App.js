import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Home } from "./components/Home";
import { AddStudent } from "./components/AddStudent";
import { ViewStudent } from "./components/ViewStudent";
import { EditStudent } from "./components/EditStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/add" element={<AddStudent/>} />
        <Route path="/view/:id" element={<ViewStudent/>} />
        <Route path="/edit/:id" element={<EditStudent/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
