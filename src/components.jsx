import { useContext, useState, useEffect, useRef } from "react";
import {
  getRandomIndex,
  formatTime,
  removeItemFromState,
  changeState,
  getVideoId,
  getVideoTitle,
} from "./utilityFuncs.js";
import { statesContext } from "./main.jsx";
import {
  fetchPlaylist,
  removeItemFromDatabase,
  addItemToDatabase,
} from "./database.js";

export function Video({ videoId }) {
  return (
    <>
      <iframe
        width="200"
        height="200"
        src={`https://www.youtube.com/embed/${videoId}`}
        loading="lazy"
      />
    </>
  );
}

export function VideoTitle({ videoTitle }) {
  return (
    <>
      <h2>{videoTitle}</h2>
    </>
  );
}

export function Round({ stateChange, maxRound }) {
  const [round, setRound] = useState(0);
  const initialMaxRound = useRef(maxRound);

  useEffect(() => {
    setRound((prevRound) => prevRound + 1);
  }, [stateChange]);

  return (
    <h2>
      Round {round}/{initialMaxRound.current}
    </h2>
  );
}

export function Timer({ seconds, videoIdsToRemove, funcToChangeState }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  function removeRandomVideo() {
    const IdToRemove = getRandomIndex(-1, videoIdsToRemove);
    removeItemFromState(videoIdsToRemove[IdToRemove], funcToChangeState);
  }

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds, videoIdsToRemove]);

  useEffect(() => {
    if (timeLeft <= 0) {
      removeRandomVideo();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  return (
    <div>
      <h1>{formatTime(timeLeft)}</h1>
    </div>
  );
}

export function Vote({ videoToRemove, funcToChangeState }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (isButtonDisabled) {
      const timer = setTimeout(() => {
        setIsButtonDisabled(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isButtonDisabled]);
  const handleClick = () => {
    setIsButtonDisabled(true);

    funcToChangeState((prevItens) =>
      prevItens.filter((vids) => vids !== videoToRemove)
    );
  };

  return (
    <>
      <button
        className="bg-main text-white p-4 "
        onClick={handleClick}
        disabled={isButtonDisabled}
      >
        vote
      </button>
    </>
  );
}

export function AddVideo(params) {
  const [states, setStates] = useContext(statesContext);
  const [inputValue, setInputValue] = useState("");

  const handleClick = async (playlistName, video) => {
    const videoId = getVideoId(video);

    try {
      const title = await getVideoTitle(videoId); // Wait for the async operation to complete

      setInputValue("");

      addItemToDatabase(playlistName, { title: title, videoId: videoId });

      const res = await fetchPlaylist(playlistName);
      changeState(setStates, { databasePlayList: res.playList.videos });
    } catch (error) {
      console.error("Error handling click:", error);
    }
  };

  return (
    <>
      <input
        type="text"
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        placeholder="youtube link "
        value={inputValue}
      />
      <button
        onClick={() => {
          handleClick(states.databasePlayListName, inputValue);
        }}
      >
        add
      </button>
    </>
  );
}

export function VideoPlaylist({ video, videoKey }) {
  const [states, setStates] = useContext(statesContext);

  function removeVideo(videoId) {
    removeItemFromDatabase(states.databasePlayListName, videoId);
    fetchPlaylist(states.databasePlayListName).then((res) => {
      changeState(setStates, { databasePlayList: res.playList.videos });
    });
    console.log("video removed" + videoId);
  }

  return (
    <div key={videoKey}>
      <a
        href={"https://www.youtube.com/watch?v=" + video.videoId}
        target="_blank"
        rel="noopener noreferrer"
      >
        {video.title}
      </a>
      <button  className="bg-main text-white p-4 " onClick={() => removeVideo(videoKey)}>remove</button>
      <br />
      <br />
    </div>
  );
}
