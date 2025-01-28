import { useContext, useState, useEffect } from "react";
import { fetchPlaylists } from "./database.js";
import { changeState } from "./utilityFuncs.js";
import { statesContext } from "./main.jsx";

import logo from "../public/logo.gif";

import {
  Button,
  Playlist,
  PlaylistsFrame,
  YoutubeFrame,
} from "./components.jsx/";

import { GameTournament } from "./pages/GamePage.jsx";
import GameModesPage from "./pages/GameModesPage.jsx";

export function StartPage({}) {
  const [started, setStarted] = useState(false);

  return (
    <>
      {!started ? (
        <div className="flex items-center justify-center h-[100vh]">
          <div className="flex flex-col items-center w-[80vw]">
            <img className="w-[60vw]" src={logo} alt="logo" /> <br />
            <Button
              name="start"
              func={() => setStarted(true)}
              // img={button}
            />
          </div>
        </div>
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
      console.log(res);
      let playlistLists = Object.values(res.playLists);
      setPlaylists(playlistLists);
    });
  }, []);

  function selectPlaylist(playlist, playlistName) {
    changeState(setStates, {
      databasePlayList: playlist,
      databasePlayListName: playlistName,
    });
    setSelected(true);
  }

  return (
    <>
      {!selected ? (
        <>
          {playlists.length === 0 ? (
            <div className="flex items-center justify-center h-[100vh]">
              <div className="flex flex-col space-y-5 items-center w-[80vw]">
                <h1>Loading...</h1>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[100vh]">
              <div className="flex flex-col space-y-5 items-center w-[80vw]">
                <PlaylistsFrame playLists={playlists} func={selectPlaylist} />
              </div>
            </div>
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
          <Playlist />

          <Button name="play" func={() => setPlaying(true)} />
        </div>
      ) : (
        <GameModesPage />
      )}
    </>
  );
}

export function WinnerPage({ videoId, videoTitle }) {
  const [restart, setRestart] = useState(false);
  const [states, setStates] = useContext(statesContext);

  return (
    <>
      {!restart ? (
        <div className="flex justify-center h-[100vh]">
          <div className="flex flex-col items-center space-y-8 justify-center w-[80%] p-6">
            <h1 className="text-2xl ">And the winner is ...</h1>
            <div className="w-full h-full">
              <YoutubeFrame videoTitle={videoTitle} videoId={videoId} />
            </div>

            <Button name="Reset" func={() => location.reload()} />
          </div>
        </div>
      ) : (
        <GamePage />
      )}
    </>
  );
}
