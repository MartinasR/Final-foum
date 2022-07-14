import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import React, {useEffect, useState} from "react";
import ToolBar from "./components/ToolBar/toolBar";
import ProfilePage from "./pages/ProfilePage";
import ThemeUpload from "./pages/ThemeUpload";
import SingleThemePage from "./pages/SingleThemePage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
    const [user, setUser] = useState(null)
    const [favorites, setFavorites] = useState([])

    return (
    <div className="App">
      <Router>
          <ToolBar favorites={favorites} user={user} setUser={setUser}/>
        <Routes>
          <Route path='/' element={<HomePage favorites={favorites} setFavorites={setFavorites} />} />
          <Route path='/login' element={<LoginPage setUser={setUser} />} />
          <Route path='/register' element={<RegistrationPage />} />
          <Route path='/profile' element={<ProfilePage setUser={setUser} user={user}/>} />
          <Route path='/productUpload' element={<ThemeUpload setUser={setUser} user={user} />} />
          <Route path='/singleTheme/:id' element={<SingleThemePage user={user} setUser={setUser}/>} />
          <Route path='/favorites' element={<FavoritesPage setFavorites={setFavorites} favorites={favorites} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
