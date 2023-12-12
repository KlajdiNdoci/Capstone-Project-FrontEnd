import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/Navbar/MyNavbar";
import HomeMain from "./components/Home/HomeMain";
import Footer from "./components/Footer/Footer";
import GameDetails from "./components/Game/GameDetails";
import RegistrationPage from "./components/Auth/RegistrationPage";

const App = () => {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomeMain />} />
        <Route path="/games/:gameId" element={<GameDetails />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
