import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { useNavigate } from "react-router-dom";


import "./css/main.css";

import {
  GameTournament,
  GameOneVsAll,
  GameFreeForAll,
} from "./pages/GamePage.jsx";
import GameModesPage from "./pages/GameModesPage.jsx";
import CustomGamePage from "./pages/CustomGamePage.jsx";
import StartPage from "./pages/StartPage.jsx";
import PlaylistsPage from "./pages/PlaylistsPage.jsx";
import PlaylistPage from "./pages/PlaylistPage.jsx";
import WinnerPage from "./pages/WinnerPage.jsx";



export const statesContext = createContext();


 
function App() {
  const navigate = useNavigate();
  const [states, setStates] = useState({
    currentPage: "PlaylistsPage",

    databasePlayList: {},
    databasePlayListName: "",
    databasePlayListId: "",

    gameMode: "",
    timeLimit: 0,
    playlistMaxNumber: 0,

    winner:{
      title: "The Way of the Samurai",
      videoId: "oRUvfEIuQrA",
    },
  });

  useEffect(() => {
    console.log(states);
    if (states.currentPage === "start") navigate("/");
    if (states.currentPage === "PlaylistsPage") navigate("/PlaylistsPage");
    if (states.currentPage === "PlaylistPage") navigate("/PlaylistPage");
    if (states.currentPage === "GameModesPage") navigate("/GameModesPage");
    if (states.currentPage === "CustomGamePage") navigate("/CustomGamePage");
    if (states.currentPage === "GameTournament") navigate("/GameTournament");
    if (states.currentPage === "GameOneVsAll") navigate("/GameOneVsAll");
    if (states.currentPage === "GameFreeForAll") navigate("/GameFreeForAll");
    if (states.currentPage === "WinnerPage") navigate("/WinnerPage");
  }, [states.currentPage, navigate]); 


  function changePage(page) {
    setStates((prev) => ({ ...prev, currentPage: page }))
  }

  return (
    <statesContext.Provider value={[states, setStates,changePage]}>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/PlaylistsPage" element={<PlaylistsPage />} />
        <Route path="/PlaylistPage" element={<PlaylistPage />} />
        <Route path="/GameModesPage" element={<GameModesPage />} />
        <Route path="/CustomGamePage" element={<CustomGamePage />} />
        <Route path="/GameTournament" element={<GameTournament />} />
        <Route path="/GameOneVsAll" element={<GameOneVsAll />} />
        <Route path="/GameFreeForAll" element={<GameFreeForAll />} />
        <Route path="/WinnerPage" element={<WinnerPage />} />
      </Routes>
    </statesContext.Provider>
  );
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/Alpaca-Video-Battle">
    <App />
  </BrowserRouter>
);
