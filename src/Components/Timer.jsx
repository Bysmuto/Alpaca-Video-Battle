import { useState, useEffect, useContext } from "react";
import { statesContext } from "../main";
import {  formatTime } from "../utils/utilityFuncs";

export default function Timer({ seconds, state, funcToVote }) {
  const [states, setStates] = useContext(statesContext);
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds);
  }, [state,seconds]);

  useEffect(() => {
    if (timeLeft <= 0) {
      funcToVote();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  return timeLeft>10 ? <h1 className="text-xl ">{formatTime(timeLeft)}</h1>: <h1 className="text-2xl text-red-500 ">{formatTime(timeLeft)}</h1>
}
