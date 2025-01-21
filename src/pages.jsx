import { useContext, useState, useEffect } from "react";
import {
  fetchPlaylists,
  fetchPlaylist,
  removeItemFromDatabase,
} from "./database.js";
import {
  Video,
  VideoTitle,
  Round,
  Timer,
  AddVideo,
  VideoPlaylist,
  Button,
  VideoCard,
  Playlist,
} from "./components.jsx/";
import { getRandomIndex, sliceList, changeState } from "./utilityFuncs.js";

import { statesContext } from "./main.jsx";

import logo from "../public/logo.gif";
import button from "../public/button1.png";

export function StartPage({}) {
  const [started, setStarted] = useState(false);

  return (
    <>
      {!started ? (
        <>
          <img style={{ width: "500px" }} src={logo} alt="logo" /> <br />
          <Button name="start" func={() => setStarted(true)} img={button} />
        </>
      ) : (
        <PlaylistsPage />
      )}
    </>
  );
}

export function PlaylistsPage({}) {
  const [states, setStates] = useContext(statesContext);
  const [selected, setSelected] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetchPlaylists().then((res) => {
      let playlistLists = Object.values(res.playLists);
      // console.log(playlistLists);
      setPlaylists(playlistLists);
    });
    // console.log("playlistS fetched from Db");
  }, []);

  function selectPlaylist(playlist, playlistName) {
    changeState(setStates, {
      databasePlayList: playlist,
      databasePlayListName: playlistName,
    });
    // console.log("PlaylistsPage:", states);
    setSelected(true);
  }

  return (
    <>
      {!selected ? (
        <>
          {playlists.length === 0 ? (
            <>
              <h1>playlists:</h1>
              <h1>Loading...</h1>
            </>
          ) : (
            <>
              <h1>playlists:</h1>
              {playlists.map((playlist, index) => (
                <Button
                  key={index}
                  name={playlist.name}
                  func={() => selectPlaylist(playlist.videos, playlist.name)}
                  img={button}
                />
              ))}
            </>
          )}
        </>
      ) : (
        <PlaylistPage />
      )}
    </>
  );
}

export function PlaylistPage({}) {
  const [playing, setPlaying] = useState(false);
  const [states, setStates] = useContext(statesContext);

  return (
    <>
      {!playing ? (
        <div className=" flex flex-col  items-center space-y-6">
          <AddVideo />
          <Playlist />

          <Button name="play" func={() => setPlaying(true)} img={button} />
        </div>
      ) : (
        <GameModesPage />
      )}
    </>
  );
}

export function GameModesPage({}) {
  const [selected, setSelected] = useState(false);
  const [states, setStates] = useContext(statesContext);

  function selectMode(mode) {
    changeState(setStates, { gameMode: mode });
    setSelected(true);
  }

  return (
    <>
      {!selected ? (
        <div className=" bg-purple-500 h-[100vh]">
          <div className="flex flex-col w-[40vw]">
          <h1 className="text-center">GAME MODE</h1>
          <div className="bg-slate-500 flex x justify-center space-x-5">
            <Button name="Hell" func={() => selectMode("Hell")} img={button} />
            <Button
              name="Normal"
              func={() => selectMode("Normal")}
              img={button}
            />
            <Button
              name="Quick"
              func={() => selectMode("Quick")}
              img={button}
            />
          </div>

          </div>
         
        </div>
      ) : (
        <GamePage />
      )}
    </>
  );
}

export function GamePage({}) {
  const [states, setStates] = useContext(statesContext);

  function gameConfig(gameMode, list) {
    let playList;
    let limitTime;

    if (gameMode === "Normal") {
      (playList = sliceList(list, 0.5)), (limitTime = 90);
    }

    if (gameMode === "Quick") {
      (playList = sliceList(list, 0.1)), (limitTime = 20);
    }

    if (gameMode === "Hell") {
      (playList = sliceList(list, 1)), (limitTime = 300);
    }

    return { playList, limitTime };
  }
  const { playList, limitTime } = gameConfig(
    states.gameMode,
    Object.values(states.databasePlayList)
  );

  const [currentPlaylist, setCurrentPlaylist] = useState(playList);

  useEffect(() => {
    console.log("Updated Playlist :", currentPlaylist);
  }, [currentPlaylist]);

  if (currentPlaylist.length >= 2) {
    let index1 = getRandomIndex(-1, currentPlaylist);
    let index2 = getRandomIndex(index1, currentPlaylist);

    let videoIndex1 = currentPlaylist[index1];
    let videoIndex2 = currentPlaylist[index2];

    let videoId1 = currentPlaylist[index1].videoId;
    let videoId2 = currentPlaylist[index2].videoId;

    let videoTitle1 = currentPlaylist[index1].title;
    let videoTitle2 = currentPlaylist[index2].title;

    console.log(videoIndex1, videoId1, videoTitle1);

    function vote(videoToRemove) {
      setCurrentPlaylist((prevItens) =>
        prevItens.filter((vids) => vids !== videoToRemove)
      );
    }

    return (
      <>
        <Timer
          seconds={limitTime}
          videoIdsToRemove={[videoIndex1, videoIndex2]}
          funcToChangeState={setCurrentPlaylist}
        />

        <Round
          stateChange={currentPlaylist}
          maxRound={currentPlaylist.length}
        />

        <VideoCard
          videoId={videoId1}
          videoTitle={videoTitle1}
          vote={() => vote(videoIndex2)}
        />

        <VideoCard
          videoId={videoId2}
          videoTitle={videoTitle2}
          vote={() => vote(videoIndex1)}
        />
      </>
    );
  }

  if (currentPlaylist.length === 1) {
    return (
      <>
        <WinnerPage
          videoId={currentPlaylist[0].videoId}
          videoTitle={currentPlaylist[0].title}
        />
      </>
    );
  }
}

export function WinnerPage({ videoId, videoTitle }) {
  const [restart, setRestart] = useState(false);
  const [states, setStates] = useContext(statesContext);
  return (
    <>
      {!restart ? (
        <>
          <h1>And the winner is </h1>
          <Video videoId={videoId} />
          <VideoTitle videoTitle={videoTitle} />

          <Button name="Reset" func={() => location.reload()} img={button} />
        </>
      ) : (
        <GamePage />
      )}
    </>
  );
}
