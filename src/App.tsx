// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import SimpleCanvasExample from "./components/SimpleCanvasExample.tsx";
import MainMenu from "./components/MainMenu";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainMenu/>} />

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
