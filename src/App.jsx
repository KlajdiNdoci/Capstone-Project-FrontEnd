import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/Navbar/MyNavbar";
import HomeMain from "./components/Home/HomeMain";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomeMain />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
