import { useContext, useState, useEffect } from "react";
import { statesContext } from "../main.jsx";

import AddGameVariable from "../Components/AddGameVariable.jsx";
import Button from "../Components/Button.jsx";

export default function CustomGamePage({}) {
  const [states, setStates, changePage] = useContext(statesContext);

  function selectMode(mode) {
    setStates((prevState) => ({
      ...prevState,
      gameMode: mode
    }));
  }

  function play() {
    changePage(states.gameMode);
  }

  return (
    <>
      {" "}
      <Button
        name={"<"}
        func={() => changePage("GameModesPage")}
        extra={"text-xs m-5"}
      />
      <div className="h-[100vh]  flex items-center justify-center">
        <div className="flex flex-col justify-center items-center w-[40vw]  gap-5">
          <div className="flex justify-center items-center w-[100%]">
            <h1 className="text-center text-xl  w-[50%]">videos limit:</h1>
            <AddGameVariable variable={"playlistMaxNumber"} placeholder={"0"} />
          </div>

          <div className="flex justify-center items-center w-[100%]">
            <h1 className="text-center text-xl  w-[50%]">time limit:</h1>
            <AddGameVariable
              variable={"timeLimit"}
              placeholder={"ex: 90 = 1:30m"}
            />
          </div>

          <div className="flex justify-center items-center w-[100%]">
            <h1 className="text-center text-xl  w-[50%]"> events % :</h1>
            <AddGameVariable
              variable={"randomEvents"}
              placeholder={"ex: 0 = 0% 50 = 50%"}
            />
          </div>

          <h1 className="text-center text-xl m-5">select mode:</h1>
          <div className=" flex x justify-center space-x-5">
            <Button
              name="free for all"
              func={() => selectMode("GameFreeForAll")}
              extra={"text-sm"}
            />

            <Button
              name="tournament"
              func={() => selectMode("GameTournament")}
              extra={"text-sm"}
            />
            <Button
              name="1 vs all"
              func={() => selectMode("GameOneVsAll")}
              extra={"text-sm"}
            />
          </div>

          <Button name="play" func={() => play()} extra={"text-sm"} />
        </div>
      </div>
    </>
  );
}
