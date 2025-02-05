import { useState, useEffect, useRef,useContext } from "react";
import { statesContext } from "../main.jsx";
export default function Round({ stateChange, maxRound }) {
  const [states] = useContext(statesContext);
  const [round, setRound] = useState(0);
  const initialMaxRound = useRef(maxRound);

  useEffect(() => {
    setRound((prevRound) => prevRound + 1);
  }, [stateChange]);

  return (
    <div className="text-2xl">
      Round <span className="text-main text-3xl">{round}</span> 
      {states.gameMode === "GameTournament" && (
        <span className="text-white text-opacity-50 text-2xl">
          of {initialMaxRound.current}
        </span>
      )}
    </div>
  );
}
