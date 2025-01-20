import { createContext, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

import { StartPage } from "./pages.jsx";

import "./css/main.css";


export const statesContext = createContext();

function App() {
  const [states, setStates] = useState({
    databasePlayList: {},
    databasePlayListName: '',
    gameMode: "",
  });

  // useEffect(() => {
  //   console.log("states changed:");
  //   console.log(states);
  // }, [states]);

  return (
    <>
      <statesContext.Provider value={[states, setStates]}>
        <StartPage />
      </statesContext.Provider>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
