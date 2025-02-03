import { useState, useEffect, useContext } from "react";
import { statesContext } from "../main"; 
import { getRandomIndex, formatTime } from "../utilityFuncs"; 
export default function Timer({ seconds, videoIdsToRemove, funcToVote }) {
  const [states, setStates] = useContext(statesContext);
  const [timeLeft, setTimeLeft] = useState(seconds);

  let removeRandomVideo = () => {
    const IdToRemove = getRandomIndex(-1, videoIdsToRemove);
    console.log(IdToRemove);
    funcToVote(IdToRemove);
  };

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds, videoIdsToRemove]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (states.gameMode === "GameTournament") {
        removeRandomVideo();
        return;
      } else {
        funcToVote();
        return;
      }
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  return <h1 className="text-3xl m-4">{formatTime(timeLeft)}</h1>;
}

