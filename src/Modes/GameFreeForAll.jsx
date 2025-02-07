import { useContext, useEffect, useState, useRef } from "react";
import { getRandomIndex, preparePlaylist } from "../utils/utilityFuncs.js";
import { statesContext } from "../main.jsx";
import Round from "../Components/Round.jsx";
import Timer from "../Components/Timer.jsx";
import { FreeForAllCard, AlpacaCard } from "../Components/VideoCard.jsx";
import Button from "../Components/Button.jsx";

import spin from "../../public/sounds/spin.mp3";

export default function GameFreeForAll({}) {
  const [states, setStates, changePage] = useContext(statesContext);

  //main
  const [currentPlaylist, setCurrentPlaylist] = useState(
    preparePlaylist(Object.values(states.databasePlayList))
  );
  const [seconds, setSeconds] = useState(states.timeLimit);

  function vote(indexToRemove) {
    playSound();

    if (makeCopies) {
      setCurrentPlaylist((prevItens) => [
        ...prevItens,
        ...Array(2)
          .fill(null)
          .map(() => prevItens[indexToRemove])
      ]);
    }

    resetEvents();

    setCurrentPlaylist((prevItens) =>
      prevItens.filter((_, index) => index !== indexToRemove)
    );
  }

  //sound
  const audioRef = useRef(new Audio(spin));
  function playSound() {
    audioRef.current.volume = 0.4;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  }
  useEffect(() => {
     playSound()
  }, []);

  useEffect(() => {
    if (currentPlaylist.length === 1) {
      setStates((prev) => ({ ...prev, winner: currentPlaylist[0] }));
      changePage("WinnerPage");
    }
    console.log(currentPlaylist);
  }, [currentPlaylist]);

  //events
  const [hideVideo1, setHideVideo1] = useState(false);
  const [hideVideo2, setHideVideo2] = useState(false);
  const [makeCopies, setMakeCopies] = useState(false);
  const [skipButton, setSkipButton] = useState(false);
  const [forceRender, setForceRender] = useState(false);

  
  useEffect(() => {
    if (
      currentPlaylist.length > 3 &&
      Math.floor(Math.random() * 100) < states.randomEvents
    ) {
      let eventSkip = () => {
        setSkipButton(true);
      };

      let eventTime = () => {
        setSeconds(10);
      };

      let eventHide = () => {
        let random = Math.random();

        if (random < 0.4) {
          setHideVideo1(true);
        } else if (random < 0.8) {
          setHideVideo2(true);
        } else {
          setHideVideo1(true);
          setHideVideo2(true);
        }
      };

      let eventCopy = () => {
        setMakeCopies(true);
      };

      let events = [eventSkip, eventHide, eventTime, eventCopy];
      events[Math.floor(Math.random() * events.length)]();
    }
  }, [currentPlaylist]);

  function resetEvents() {
    setHideVideo1(false);
    setHideVideo2(false);
    setSkipButton(false);
    setMakeCopies(false);
    setSeconds(states.timeLimit);
  }

  function eventWarings() {
    if (seconds === 10)
      return (
        <h1 className="m-2 w-full text-center">you only have 10 seconds</h1>
      );

    if (makeCopies) {
      return (
        <h1 className="m-2 w-full text-center">
          2 copies of the loser will be made
        </h1>
      );
    }

    if (skipButton) {
      return (
        <h1 className="m-2 w-full text-center">You can skip if you want</h1>
      );
    }

    if (hideVideo1 && hideVideo2) {
      return (
        <h1 className="m-2 w-full text-center">
          Both videos are hidden behind alpacas
        </h1>
      );
    }

    if (hideVideo1) {
      return (
        <h1 className="m-2 w-full text-center ">
          the first video is hidden behind the alpaca
        </h1>
      );
    }

    if (hideVideo2) {
      return (
        <h1 className="m-2 text-center ">
          the second video is hidden behind the alpaca
        </h1>
      );
    }
  }

  if (currentPlaylist.length >= 2) {
    const index1 = getRandomIndex(-1, currentPlaylist);
    const index2 = getRandomIndex(index1, currentPlaylist);

    return (
      <div className="flex flex-col items-center justify-center  ">
        <div className="w-full flex justify-between items-center p-3 ">
          <Button
            name={"<"}
            func={() => changePage("GameModesPage")}
            extra={"text-xs"}
          />
          <Round
            stateChange={currentPlaylist}
            maxRound={currentPlaylist.length}
          />
          <Timer
            seconds={seconds}
            state={currentPlaylist}
            funcToVote={() => vote(index1)}
          />
        </div>

        {eventWarings()}

        <div className="grid grid-cols-2 gap-4 mt-10 relative">
          {hideVideo1 ? (
            <AlpacaCard vote={() => vote(index2)} />
          ) : (
            <FreeForAllCard
              key={`video1-${currentPlaylist}`}
              videoId={currentPlaylist[index1].videoId}
              videoTitle={currentPlaylist[index1].title}
              vote={() => vote(index2)}
            />
          )}

          {hideVideo2 ? (
            <AlpacaCard vote={() => vote(index1)} />
          ) : (
            <FreeForAllCard
              key={`video2-${currentPlaylist}`}
              videoId={currentPlaylist[index2].videoId}
              videoTitle={currentPlaylist[index2].title}
              vote={() => vote(index1)}
              isRight={true}
            />
          )}

          {skipButton && (
            <div className="col-span-2">
              <Button
                name="skip"
                func={() => {
                  setForceRender((prev) => !prev);
                  setSkipButton(false);
                }}
                extra="w-full"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
