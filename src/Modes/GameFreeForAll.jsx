import { useContext, useEffect, useState, useRef } from "react";
import { getRandomIndex, preparePlaylist } from "../utils/utilityFuncs.js";
import { statesContext } from "../main.jsx";
import Round from "../Components/Round.jsx";
import Timer from "../Components/Timer.jsx";
import {FreeForAllCard} from "../Components/VideoCard.jsx";
import Button from "../Components/Button.jsx";

import spin from "../../public/sounds/spin.mp3";

export default function GameFreeForAll({}) {
  const [states, setStates, changePage] = useContext(statesContext);

    //sound
    const audioRef = useRef(new Audio(spin));
    function playSound() {
      audioRef.current.volume = 0.4;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    useEffect(() => {
      playSound();
    }, []);

  //main

  
  const [currentPlaylist, setCurrentPlaylist] = useState(
    preparePlaylist(Object.values(states.databasePlayList))
  );


  function vote(indexToRemove) {
    currentPlaylist.length > 2 && playSound();

    setCurrentPlaylist((prevItens) => prevItens.filter((_, index) => index !== indexToRemove));
  }

  useEffect(() => {
    if (currentPlaylist.length === 1) {
      setStates((prev) => ({ ...prev, winner: currentPlaylist[0] }));
      changePage("WinnerPage");
    }
    console.log(currentPlaylist);
  }, [currentPlaylist]);

  if (currentPlaylist.length >= 2) {
    const index1 = getRandomIndex(-1, currentPlaylist);
    const index2 = getRandomIndex(index1, currentPlaylist);

    return (
      <div className="flex flex-col items-center justify-center  ">
        <div className="w-full flex justify-between items-center p-3 ">
          <Button
            name={"<"}
            func={() => changePage("GameModesPage")}
            extra={"text-xs bg-orange-500 border-orange-900"}
          />
          <Round
            stateChange={currentPlaylist}
            maxRound={currentPlaylist.length}
            extra={"text-orange-500"}
          />
          <Timer seconds={states.timeLimit} state={currentPlaylist} funcToVote={() => vote(index1)} />
        </div>

        <div className="grid grid-cols-2 gap-4 m-4 mt-12 ">
          <FreeForAllCard
            key={`video1-${currentPlaylist}`}
            videoId={currentPlaylist[index1].videoId}
            vote={() => vote(index2)}
          />

          <FreeForAllCard
            key={`video2-${currentPlaylist}`}
            videoId={currentPlaylist[index2].videoId}
            vote={() => vote(index1)}
            isRight={true}
          />
        </div>
      </div>
    );
  }
}
