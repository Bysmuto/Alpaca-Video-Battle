import React, { useContext,useRef,useEffect } from "react";
import { statesContext } from "../main"; // Adjust the path based on your project structure
import { WinnerCard } from "../Components/VideoCard.jsx";

import ding from "../../public/sounds/ding.mp3";


export default function WinnerPage({ }) {
  const [states, setStates, changePage] = useContext(statesContext);

    //sound
    const audioRef = useRef(new Audio(ding));
    function playSound() {
      audioRef.current.volume = 1;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    useEffect(() => {
       playSound()
    }, []);

  return (
    <>
      <div className="flex justify-center h-[100vh]">
        <div className="flex flex-col items-center space-y-8 justify-center w-[80%] p-6">
          <h1 className="md:text-2xl">And the winner is ...</h1>

          <WinnerCard
            videoId={states.winner.videoId}
  
            func={() => {
              window.location.replace("/");
            }}
          />
        </div>
      </div>
    </>
  );
}
