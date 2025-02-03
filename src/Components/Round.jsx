import { useState, useEffect, useRef } from "react";

export default function Round({ stateChange, maxRound }) {
  const [round, setRound] = useState(0);
  const initialMaxRound = useRef(maxRound);

  useEffect(() => {
    setRound((prevRound) => prevRound + 1);
  }, [stateChange]);

  return (
    <div className="text-5xl">
      Round <span className="text-main text-5xl">{round}</span>
      <span className="text-white text-opacity-50 text-4xl">
        of {initialMaxRound.current}
      </span>
    </div>
  );
}

