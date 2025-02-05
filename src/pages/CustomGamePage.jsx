import { useContext, useState, useEffect } from "react";
import { statesContext } from "../main.jsx";

import AddGameVariable from "../Components/AddGameVariable.jsx";
import Button from "../Components/Button.jsx";

export default function CustomGamePage({}) {
  const [states, setStates, changePage] = useContext(statesContext);

  function selectMode(mode) {
    setStates((prevState) => ({
      ...prevState,
      gameMode: mode,
    }));
  }

  function play() {
    changePage(states.gameMode);
  }

  return (
    <>
      <div className=" h-[100vh] flex items-center justify-center">
        <div className="flex flex-col w-[40vw]  gap-8">
          <h1 className="text-center text-xl m-5">game modes:</h1>
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
          <h1 className="text-center text-xl m-5">time limit:</h1>
          <span className="text-xs  leading-loose">
            * put only the seconds ( ex: 90 = 1:30m)
          </span>
          <AddGameVariable variable={"timeLimit"} />

          <h1 className="text-center text-xl m-5 leading-loose">number of videos:</h1>
          <span className="text-xs leading-loose">
            * in tournament will be automaticaly a power of 2 ( ex: 100 = 64)
          </span>
          <AddGameVariable variable={"playlistMaxNumber"} />
          

          <h1 className="text-center text-xl m-5">probability of random events:</h1>
          <span className="text-xs  leading-loose">
            * 0 = no events , 50 = 50% of a random event
          </span>
          <span className="text-xs">
            *not available in GameTournament
          </span>
          <AddGameVariable variable={"randomEvents"} />

          <Button name="play" func={() => play()} extra={"text-sm"} />
        </div>
      </div>
    </>
  );
}
