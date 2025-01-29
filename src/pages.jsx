import { useContext, useState, useEffect } from "react";
import { fetchPlaylists } from "./database.js";
import { changeState } from "./utilityFuncs.js";
import { statesContext } from "./main.jsx";
import { useNavigate } from "react-router-dom";

import logo from "../public/logo.gif";

import {
  Button,
  Playlist,
  PlaylistsFrame,
  YoutubeFrame,
} from "./components.jsx/";

export function StartPage({}) {
  const [states, setStates, changePage] = useContext(statesContext);
  return (
    <>
      <div className="flex items-center justify-center h-[100vh]">
        <div className="flex flex-col items-center w-[80vw]">
          <img className="w-[60vw]" src={logo} alt="logo" /> <br />
          <Button name="start" func={() => changePage("PlaylistsPage")} />
        </div>
      </div>
    </>
  );
}

export function PlaylistsPage({}) {
  const [states, setStates, changePage] = useContext(statesContext);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetchPlaylists().then((res) => {
      console.log(res);
      let playlistLists = Object.entries(res.playLists);
      console.log(playlistLists);
      setPlaylists(playlistLists);
    });
  }, []);

  function selectPlaylist(playlist, playlistName, databasePlayListId) {
    changeState(setStates, {
      databasePlayList: playlist,
      databasePlayListName: playlistName,
      databasePlayListId: databasePlayListId,
    });
    changePage("PlaylistPage");
  }

  return (
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
  );
}

export function PlaylistPage({}) {
  const [states, setStates, changePage] = useContext(statesContext);
  return (
    <>
      <div className=" flex flex-col  items-center space-y-6">
        <Playlist />

        <Button name="play" func={() => changePage("GameModesPage")} />
      </div>
    </>
  );
}

export function WinnerPage({ videoId, videoTitle }) {
  const [states, setStates, changePage] = useContext(statesContext);

  return (
    <>
      <div className="flex justify-center h-[100vh]">
        <div className="flex flex-col items-center space-y-8 justify-center w-[80%] p-6">
          <h1 className="text-2xl ">And the winner is ...</h1>
          <div className="w-full h-full">
            <YoutubeFrame videoTitle={videoTitle} videoId={videoId} />
          </div>

          <Button name="Reset" func={() => changePage("start")} />
        </div>
      </div>
    </>
  );
}
