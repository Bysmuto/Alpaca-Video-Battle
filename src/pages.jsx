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
  Vote,
  AddVideo,
  VideoPlaylist,
} from "./components.jsx/";
import { getRandomIndex, sliceList, changeState } from "./utilityFuncs.js";

import { statesContext } from "./main.jsx";

export function StartPage({}) {
  const [started, setStarted] = useState(false);

  return (
    <>
      {!started ? (
        <>
          <img
            style={{ width: "500px" }}
            src="/src/assets/logo.gif"
            alt="logo"
          />{" "}
          <br />
          <button
            className="bg-main text-white p-4 "
            onClick={() => setStarted(true)}
          >
            start
          </button>
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
                <button
                  style={{
                    padding: "1rem",
                    color: "white",
                    backgroundColor: "#1db954",
                  }}
                  key={index}
                  onClick={() => selectPlaylist(playlist.videos, playlist.name)}
                >
                  {playlist.name}
                </button>
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
  console.log(states.databasePlayList);

  return (
    <>
      {!playing ? (
        <>
          <button
            className="bg-main text-white p-4 "
            onClick={() => setPlaying(true)}
          >
            play
          </button>

          <AddVideo />

          <h2>
            {states.databasePlayListName}:
            {Object.values(states.databasePlayList).length}
          </h2>

          {Object.entries(states.databasePlayList)
            .reverse()
            .map(([key, video], index) => {
              return <VideoPlaylist key={index} video={video} videoKey={key} />;
            })}
        </>
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
        <>
          <h1>GAME MODE</h1>

          <button
            style={{
              padding: "1rem",
              color: "white",
              backgroundColor: "#1db954",
            }}
            onClick={() => selectMode("Hell")}
          >
            Hell
          </button>
          <button
            style={{
              padding: "1rem",
              color: "white",
              backgroundColor: "#1db954",
            }}
            onClick={() => selectMode("Normal")}
          >
            Normal
          </button>
          <button onClick={() => selectMode("Quick")}>Quick</button>
        </>
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

        <Vote
          videoToRemove={videoIndex2}
          funcToChangeState={setCurrentPlaylist}
        />

        <Video videoId={videoId1} />
        <VideoTitle videoTitle={videoTitle1} />

        <br />
        <br />

        <Vote
          videoToRemove={videoIndex1}
          funcToChangeState={setCurrentPlaylist}
        />
        <Video videoId={videoId2} />
        <VideoTitle videoTitle={videoTitle2} />
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
          <button onClick={() => location.reload()}>restart</button>
        </>
      ) : (
        <GamePage />
      )}
    </>
  );
}
