import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/Navbar/MyNavbar";

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
