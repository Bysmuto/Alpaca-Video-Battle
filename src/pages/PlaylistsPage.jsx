import React, { useContext, useEffect, useState } from "react";
import { statesContext } from "../main";
import { fetchPlaylists } from "../utils/database";
import { changeState } from "../utils/utilityFuncs";
import AddPlaylist from "../Components/AddPlaylist";
import Button from "../Components/Button";

export default function PlaylistsPage() {
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
      databasePlayListId: databasePlayListId
    });
    changePage("PlaylistPage");
  }

  const loading = (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="flex flex-col space-y-5 items-center w-[80vw]">
        <h1>Loading...</h1>
      </div>
    </div>
  );

  return (
    <>
      {playlists.length === 0 ? (
        loading
      ) : (
        <div className="flex flex-col items-center justify-center h-[100vh]">
          <h1 className="text-sm md:text-xl">Select a playlist</h1>
          <div className="flex flex-col m-4 p-6 space-y-5 items-center w-[80vw] h-[60vh]    border-4 border-main md:w-[50vw]">
            <div className=" p-8 w-full flex flex-col items-center overflow-auto space-y-6 ">
              {playlists.reverse().map((playlist) => (
                <Button
                  key={playlist[0]}
                  name={playlist[1].name}
                  func={() => selectPlaylist(playlist[1].videos, playlist[1].name, playlist[0])}
                  extra={"w-full text-sm md:text-xl"}
  
                />
              ))}
            </div>
           
          </div>
         
          <h1 className="text-xs md:text-xl mt-6">Create a new playlist</h1>
          <div className="w-[80vw] m-4 md:w-[50vw]">
          <AddPlaylist />
          </div>
        </div>
      )}
    </>
  );
}
