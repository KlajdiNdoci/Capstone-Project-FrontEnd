import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/Navbar/MyNavbar";
import HomeMain from "./components/Home/HomeMain";
import Footer from "./components/Footer/Footer";
import GameDetails from "./components/Game/GameDetails";
import RegistrationPage from "./components/Auth/RegistrationPage";
import LoginPage from "./components/Auth/LoginPage";
import { useSelector } from "react-redux";
import GameListPage from "./components/Game/GameListPage";
import UserProfile from "./components/Profile/UserProfile";
import NewsDetail from "./components/News/NewsDetail";
import NewsListPage from "./components/News/NewsListPage";

const App = () => {
  const token = useSelector(state => state.auth.token);

  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={token ? <HomeMain /> : <Navigate to="/login" />} />
        <Route path="/games/:gameId" element={token ? <GameDetails /> : <Navigate to="/login" />} />
        <Route path="/games" element={token ? <GameListPage /> : <Navigate to="/login" />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile/:userId" element={token ? <UserProfile /> : <Navigate to="/login" />} />
        <Route path="/news/:newsId" element={token ? <NewsDetail /> : <Navigate to="/login" />} />
        <Route path="/news/" element={token ? <UserProfile /> : <NewsListPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
