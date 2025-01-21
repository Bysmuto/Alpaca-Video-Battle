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

import logo from "../public/logo.gif";
import button from "../public/button1.png";
import videoFrame from "../public/video frame.png";

export function component({}) {
  return <></>;
}

export function Button({ name, func, img }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (isButtonDisabled) {
      const timer = setTimeout(() => {
        setIsButtonDisabled(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isButtonDisabled]);

  const handleClick = async () => {
    setIsButtonDisabled(true);
    if (typeof func === "function") {
      await func();
    }
  };

  return (
    <button
      // style={{ backgroundImage: `url(${img})` }}
      className={`text-white text-4xl p-4 rounded-md bg-main ${
        isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleClick}
      disabled={isButtonDisabled}
    >
      {name}
    </button>
  );
}

//game
export function Round({ stateChange, maxRound }) {
  const [round, setRound] = useState(0);
  const initialMaxRound = useRef(maxRound);

  useEffect(() => {
    setRound((prevRound) => prevRound + 1);
  }, [stateChange]);

  return (
    <div className="text-6xl p-6 absolute top-0 left-1/2 transform -translate-x-1/2">
      Rounds left  <span className="text-main">{initialMaxRound.current-round}</span> 
    </div>
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
      <h1 className="text-3xl absolute top-0 right-0 m-4">
        {formatTime(timeLeft)}
      </h1>
    </div>
  );
}

//video
export function VideoCard({ videoId, videoTitle, vote }) {
  return (
    <div className=" m-4 flex flex-col items-center justify-center w-[40vw] ">
      <div className="space-y-5 flex flex-col items-center justify-center w-full  h-[40vh] ">
        <VideoFrame videoTitle={videoTitle} videoId={videoId} />
        <Button name="vote" func={vote} img={button} />
      
      </div>
    </div>
  );
}

export function VideoFrame({ videoTitle, videoId }) {
  return (
    <div className="flex flex-col w-full border-4 border-main bg-white ">
      {/* Title Bar */}
      <div className="flex justify-between items-center bg-white px-2 py-1 border-b-4 border-green-500">
        <VideoTitle videoTitle={videoTitle} />
        <div className="flex items-center">
          <span className="text-3xl text-black mx-1 font-mono">-</span>
          <span className="text-3xl text-black mx-1 font-mono">□</span>
          <span className="text-3xl text-red-500 mx-1 font-mono font-extrabold">
            ×
          </span>
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-black border-b-4 border-green-500 h-[40vh]">
        <Video videoId={videoId} />
      </div>
    </div>
  );
}

export function Video({ videoId }) {
  return (
    <iframe
      className="w-full h-full"
      src={`https://www.youtube.com/embed/${videoId}`}
    />
  );
}

export function VideoTitle({ videoTitle }) {
  return (
    <div className="w-[90%] text-main  overflow-hidden text-ellipsis whitespace-nowrap ">
      <a className=" text-2xl">{videoTitle}</a>
    </div>
  );
}

//playlist
export function AddVideo({}) {
  const [states, setStates] = useContext(statesContext);
  const [inputValue, setInputValue] = useState("");

  const handleClick = async (playlistName, video) => {
    const videoId = getVideoId(video);

    try {
      const title = await getVideoTitle(videoId);

      setInputValue("");

      addItemToDatabase(playlistName, { title: title, videoId: videoId });

      const res = await fetchPlaylist(playlistName);
      changeState(setStates, { databasePlayList: res.playList.videos });
    } catch (error) {
      console.error("Error handling click:", error);
    }
  };

  return (
    <div className="mt-5">
      <input
        className="text-main p-4"
        type="text"
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        placeholder="youtube link "
        value={inputValue}
      />
      <Button
        name="add"
        func={() => handleClick(states.databasePlayListName, inputValue)}
        img={button}
      />
    </div>
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
    <div className="flex justify-between m-3">
      <div
        className="w-[80%] overflow-hidden text-ellipsis whitespace-nowrap"
        key={videoKey}
      >
        <a
          href={"https://www.youtube.com/watch?v=" + video.videoId}
          target="_blank"
          rel="noopener noreferrer"
        >
          {video.title}
        </a>
      </div>
      <Button name="remove" func={() => removeVideo(videoKey)} img={button} />
    </div>
  );
}

export function PlaylistInfo({}) {
  const [states, setStates] = useContext(statesContext);
  return (
    <div>
      {states.databasePlayListName} -
      {Object.values(states.databasePlayList).length} videos
    </div>
  );
}

export function Playlist({}) {
  const [states, setStates] = useContext(statesContext);
  return (
    <div className="bg-blue-500 w-[80vw] flex flex-col ">
      <PlaylistInfo />

      <div className="bg-orange-300 h-[70vh]  p-4 overflow-auto  ">
        {Object.entries(states.databasePlayList)
          .reverse()
          .map(([key, video], index) => {
            return <VideoPlaylist key={index} video={video} videoKey={key} />;
          })}
      </div>
    </div>
  );
}
