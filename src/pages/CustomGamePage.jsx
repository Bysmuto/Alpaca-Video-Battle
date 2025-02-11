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
    changePage(mode);
  }

  return (
    <>
      <Button name={"<"} func={() => changePage("GameModesPage")} extra={"text-xs m-5"} />
      <div className="h-[80vh] m-5 flex items-center justify-center">
        <div className="flex flex-col justify-center items-center  gap-4">
          <h1 className="text-center md:text-xl ">videos limit:</h1>
          <AddGameVariable variable={"playlistMaxNumber"} placeholder={"0"} />

          <h1 className="text-center md:text-xl  ">time limit:</h1>
          <AddGameVariable variable={"timeLimit"} placeholder={"ex: 90 = 1:30m"} />

          <h1 className="text-center md:text-xl  "> events % :</h1>
          <AddGameVariable variable={"randomEvents"} placeholder={"ex: 50 = 50%"} />

          <h1 className="text-center  m-5 md:text-2xl">select mode:</h1>
          <div className="grid  gap-3 md:grid-cols-3 ">
            <Button
              name="free for all"
              func={() => selectMode("GameFreeForAll")}
              extra={"text-xs"}
            />

            <Button name="tournament" func={() => selectMode("GameTournament")} extra={"text-xs"} />
            <Button name="1 vs all" func={() => selectMode("GameOneVsAll")} extra={"text-xs"} />
          </div>
        </div>
      </div>
    </>
  );
}
