import React, { useContext, useEffect, useState } from "react";
import { statesContext } from "../main";
import { fetchPlaylists } from "../utils/database";
import { changeState } from "../utils/utilityFuncs";
import WindowFrame from "../Components/WindowFrame";
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
        <div className="flex items-center justify-center h-[100vh]">
          <div className="flex flex-col space-y-5 items-center w-[80vw]">
            <WindowFrame
              title={
                <span className="text-main pl-6 text-xl">Select playlists</span>
              }
              content={
                <>
                  <div className="flex justify-center">
                    <AddPlaylist />
                  </div>

                  <div className="h-[70vh] p-4 overflow-auto flex flex-col items-center space-y-6">
                    {playlists.map((playlist) => (
                      <Button
                        key={playlist[0]}
                        name={playlist[1].name}
                        func={() =>
                          selectPlaylist(
                            playlist[1].videos,
                            playlist[1].name,
                            playlist[0]
                          )
                        }
                        extra={"w-[80%] text-4xl"}
                      />
                    ))}
                  </div>
                </>
              }
            />
          </div>
        </div>
      )}
    </>
  );
}
