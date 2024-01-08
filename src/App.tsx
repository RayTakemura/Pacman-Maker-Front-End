// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import SimpleCanvasExample from "./components/SimpleCanvasExample.tsx";
import MainMenu from "./components/MainMenu";
import Custom from "./components/Custom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainMenu/>} />
        <Route path="custom" element={<Custom/>}/>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
