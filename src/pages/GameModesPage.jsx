import { useContext, useEffect, useState } from "react";
import { statesContext } from "../main.jsx";
import { Button } from "../components.jsx";
import { useNavigate } from "react-router-dom";

export default function GameModesPage({}) {
  const navigate = useNavigate();

  const [states, setStates, changePage] = useContext(statesContext);

  function selectMode(mode) {
    if (mode === "normal") {
      setStates((prevState) => ({
        ...prevState,
        gameMode: "GameTournament",
        playlistMaxNumber: 128,
        timeLimit: 90,
      }));
      changePage("GameTournament");
    }

    if (mode === "quick") {
      setStates((prevState) => ({
        ...prevState,
        gameMode: "GameOneVsAll",
        playlistMaxNumber: 50,
        timeLimit: 30,
      }));
      changePage("GameOneVsAll");
    }

    if (mode === "hell") {
      setStates((prevState) => ({
        ...prevState,
        gameMode: "GameFreeForAll",
        playlistMaxNumber: 500,
        timeLimit: 300,
      }));
      changePage("GameFreeForAll");
    }

    if (mode === "custom") {
      changePage("CustomGamePage");
    }

 
  }

  return (
    <>
      <div className=" h-[100vh] flex items-center justify-center">
        <div className="flex flex-col w-[40vw]  justify-center items-center  gap-8">
          <h1 className="text-center text-4xl m-10">GAME MODE</h1>
          <div className=" flex justify-center items-center space-x-5">
            <Button
              name="full"
              func={() => selectMode("hell")}
             
            />
            <Button name="normal" func={() => selectMode("normal")} />
            <Button
              name="quick"
              func={() => selectMode("quick")}
             
            />
          </div>

          <Button
            name="Custom"
            func={() => selectMode("custom")}
            extra={"text-main bg-white w-[50%] "}
          />
        </div>
      </div>
    </>
  );
}
