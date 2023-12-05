import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/Navbar/MyNavbar";
import HomeMain from "./components/Home/HomeMain";

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomeMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
