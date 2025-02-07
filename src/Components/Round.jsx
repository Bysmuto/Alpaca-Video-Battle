import { useState, useEffect, useRef, useContext } from "react";
import { statesContext } from "../main.jsx";
export default function Round({ stateChange, maxRound }) {
  const [states] = useContext(statesContext);
  const [round, setRound] = useState(0);
  const initialMaxRound = useRef(maxRound);

  useEffect(() => {
    setRound((prevRound) => prevRound + 1);
  }, [stateChange]);

  return (
    <div className="">
      Round <span className="text-main text-xl">{round}</span>
      <span className="text-white text-opacity-50 ">
        /{initialMaxRound.current}
      </span>
    </div>
  );
}
