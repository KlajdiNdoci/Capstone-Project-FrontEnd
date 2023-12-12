import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/Navbar/MyNavbar";
import HomeMain from "./components/Home/HomeMain";
import Footer from "./components/Footer/Footer";
import GameDetails from "./components/Game/GameDetails";
import RegistrationPage from "./components/Auth/RegistrationPage";
import LoginPage from "./components/Auth/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomeMain />} />
        <Route path="/games/:gameId" element={<GameDetails />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
