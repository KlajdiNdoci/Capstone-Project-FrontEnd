import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/Navbar/MyNavbar";
import HomeMain from "./components/Home/HomeMain";
import Footer from "./components/Footer/Footer";
import GameDetails from "./components/Game/GameDetails";
import { persistor } from "./redux/store";
import { useEffect } from "react";

const App = () => {
  const handleRestoreState = () => {
    persistor.purge();
  };

  useEffect(() => {
    handleRestoreState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomeMain />} />
        <Route path="/games/:gameId" element={<GameDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
