import { useContext, useEffect, useRef, useState } from "react";
import { preparePlaylist, separateIntoPairs } from "../utils/utilityFuncs.js";
import { statesContext } from "../main.jsx";
import Round from "../Components/Round.jsx";
import Timer from "../Components/Timer.jsx";
import { PedroCard } from "../Components/VideoCard.jsx";
import Button from "../Components/Button.jsx";


import pedroSound from "../../public/sounds/pedro.mp3";

export default function GameTournament({}) {
  const [states, setStates, changePage] = useContext(statesContext);
  const [currentPlaylist, setCurrentPlaylist] = useState(
    preparePlaylist(Object.values(states.databasePlayList))
  );
  const [roundWinners, setRoundWinners] = useState([]);
  const [seconds, setSeconds] = useState(states.timeLimit);

    //sound
    const audioRef = useRef(new Audio(pedroSound));
    function playSound() {
      audioRef.current.volume = 0.45;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    useEffect(() => {
       playSound()
    }, []);

  useEffect(() => {
    if (currentPlaylist.length === 0 && roundWinners.length > 1) {
      setCurrentPlaylist(separateIntoPairs(roundWinners));
      setRoundWinners([]);
    }
    if (currentPlaylist.length === 0 && roundWinners.length === 1) {
      setStates((prev) => ({ ...prev, winner: roundWinners[0] }));
      changePage("WinnerPage");
    }

    console.log(currentPlaylist);
    console.log(roundWinners);
  }, [currentPlaylist]);

  function vote(videoIndex) {
  



    const roundWinner = currentPlaylist[0][videoIndex];
    setRoundWinners((prevNextRound) => [...prevNextRound, roundWinner]);

    setCurrentPlaylist((prevNextRound) => {
      return [...prevNextRound].slice(1);
    });

     (currentPlaylist.length === 1 && roundWinners.length === 0)?'':playSound()

  }

  if (currentPlaylist.length >= 1) {
    return (
      <div className="flex flex-col items-center justify-center  ">
        <div className="w-full flex justify-between items-center p-3 ">
          <Button
            name={"<"}
            func={() => changePage("GameModesPage")}
            extra={"text-xs bg-yellow-500 border-yellow-900"}
          />
          <Round
          extra={'text-yellow-500'}
            stateChange={currentPlaylist}
            maxRound={currentPlaylist.length}
          />
          <Timer
            seconds={seconds}
            state={currentPlaylist}
            funcToVote={() => vote(0)}
          />
        </div>

        <div className="m-4 w-full flex justify-center"></div>
        <div className="grid grid-cols-2 gap-4 m-4 mt-10 ">
          <PedroCard
            key={currentPlaylist[0][0]?.videoId}
            videoId={currentPlaylist[0][0]?.videoId}
  
            vote={() => vote(0)}
          />

          <PedroCard
            key={currentPlaylist[0][1]?.videoId}
            videoId={currentPlaylist[0][1]?.videoId}
   
            vote={() => vote(1)}
            isRight={true}
          />
        </div>
      </div>
    );
  }
}
