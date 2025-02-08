import { useContext, useEffect, useState, useRef } from "react";
import { getRandomIndex, preparePlaylist } from "../utils/utilityFuncs.js";
import { statesContext } from "../main.jsx";
import Round from "../Components/Round.jsx";
import Timer from "../Components/Timer.jsx";
import { OneVsAllCard, AlpacaCard } from "../Components/VideoCard.jsx";
import Button from "../Components/Button.jsx";
import woosh from "../../public/sounds/woosh.mp3";

export default function GameFreeForAll({}) {
  const [states, setStates, changePage] = useContext(statesContext);

  const [currentPlaylist, setCurrentPlaylist] = useState(
    preparePlaylist(Object.values(states.databasePlayList))
  );
  const [seconds, setSeconds] = useState(states.timeLimit);
  const buttonDisabled = useRef(false);

  const [hideVideo1, setHideVideo1] = useState(false);
  const [hideVideo2, setHideVideo2] = useState(false);
  const [makeCopies, setMakeCopies] = useState(false);
  const [skipButton, setSkipButton] = useState(false);
  const [forceRender, setForceRender] = useState(false);

  //sound
  const audioRef = useRef(new Audio(woosh));
  function playSound() {
    audioRef.current.volume = 0.8;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  }
  useEffect(() => {
    playSound();
  }, []);

  useEffect(() => {
    if (currentPlaylist.length === 1) {
      setStates((prev) => ({ ...prev, winner: currentPlaylist[0] }));
      changePage("WinnerPage");
    }
    console.log(currentPlaylist);
  }, [currentPlaylist]);

  useEffect(() => {
    if (currentPlaylist.length > 3 && Math.floor(Math.random() * 100) < states.randomEvents) {
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

  function vote(indexToRemove) {
    currentPlaylist.length > 2 && playSound();

    if (makeCopies) {
      setCurrentPlaylist((prevItens) => [
        ...prevItens,
        ...Array(2)
          .fill(null)
          .map(() => prevItens[indexToRemove])
      ]);
    }

    resetEvents();

    buttonDisabled.current = true;

    setTimeout(() => {
      buttonDisabled.current = false;
    }, 1500);

    setCurrentPlaylist((prevItens) => prevItens.filter((_, index) => index !== indexToRemove));
  }

  function resetEvents() {
    setHideVideo1(false);
    setHideVideo2(false);
    setSkipButton(false);
    setMakeCopies(false);
    setSeconds(states.timeLimit);
  }

  function eventWarings() {
    if (seconds === 10) return <h1 className="m-2 w-full text-center">you only have 10 seconds</h1>;

    if (makeCopies) {
      return <h1 className="m-2 w-full text-center">2 copies of the loser will be made</h1>;
    }

    if (skipButton) {
      return <h1 className="m-2 w-full text-center">You can skip if you want</h1>;
    }

    if (hideVideo1 && hideVideo2) {
      return <h1 className="m-2 w-full text-center">Both videos are hidden behind alpacas</h1>;
    }

    if (hideVideo1) {
      return (
        <h1 className="m-2 w-full text-center ">the first video is hidden behind the alpaca</h1>
      );
    }

    if (hideVideo2) {
      return <h1 className="m-2 text-center ">the second video is hidden behind the alpaca</h1>;
    }
  }

  if (currentPlaylist.length >= 2) {
    const index1 = 0;
    const index2 = 1;

    return (
      <div className="flex flex-col items-center justify-center  ">
        <div className="w-full flex justify-between items-center p-3 ">
          <Button
            name={"<"}
            func={() => changePage("GameModesPage")}
            extra={"text-xs bg-teal-500 border-teal-900"}
          />
          <Round
            stateChange={currentPlaylist}
            maxRound={currentPlaylist.length}
            extra={"text-teal-500"}
          />
          <Timer seconds={seconds} state={currentPlaylist} funcToVote={() => vote(index1)} />
        </div>

        {eventWarings()}

        <div className="grid grid-cols-2 gap-4 m-4 mt-16 ">
          {hideVideo1 ? (
            <AlpacaCard vote={() => vote(index2)} />
          ) : (
            <OneVsAllCard
              key={`video1-${currentPlaylist}`}
              videoId={currentPlaylist[index1].videoId}
              vote={() => vote(index2)}
            />
          )}

          {hideVideo2 ? (
            <AlpacaCard vote={() => vote(index1)} />
          ) : (
            <OneVsAllCard
              key={`video2-${currentPlaylist}`}
              videoId={currentPlaylist[index2].videoId}
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
