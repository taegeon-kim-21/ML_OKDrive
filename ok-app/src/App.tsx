import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
import Home from './Routes/Home';
import Search from './Routes/Search';
import Upload from './Routes/Upload';
import Delete from './Routes/Delete';

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="upload" element={<Upload />}></Route>
          <Route path="search" element={<Search />}></Route>
          <Route path="delete" element={<Delete />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
