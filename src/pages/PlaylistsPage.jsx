import React, { useContext, useEffect, useState } from "react";
import { statesContext } from "../main";
import { fetchPlaylists } from "../utils/database";
import { changeState } from "../utils/utilityFuncs";
import AddPlaylist from "../Components/AddPlaylist";
import Button from "../Components/Button";

export default function PlaylistsPage() {
  const [states, setStates, changePage] = useContext(statesContext);
  const [playlists, setPlaylists] = useState([]);

  const categorys = ["all", "music", "gaming", "tv shows", "internet culture", "others"];
  const [categoryIndex, setCategoryIndex] = useState(0); // Start at index 0

  const nextCategory = () => {
    setCategoryIndex((prevIndex) => (prevIndex + 1) % categorys.length);
  };

  const prevCategory = () => {
    setCategoryIndex((prevIndex) => (prevIndex - 1 + categorys.length) % categorys.length);
  };

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
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col space-y-5 items-center w-[80vw]">
        <h1>Loading...</h1>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <h1 className="mb-12 text-md md:text-xl">Select a playlist</h1>

      <div className="w-[80vw] md:w-[50vw] flex justify-between items-center p-3  ">
        <Button
          name={"<"}
          func={prevCategory}
          extra={"text-md px-[0.8rem] py-[0.3rem]  md:px-6 md:py-2"}
        />

        <h1 className="text-md text-center md:text-2xl">{categorys[categoryIndex]}</h1>

        <Button
          name={">"}
          func={nextCategory}
          extra={"text-md px-[0.8rem] py-[0.3rem]  md:px-6 md:py-2"}
        />
      </div>

      <div className="flex flex-col m-4 p-2 space-y-5 items-center w-[80vw] md:w-[50vw] h-[60vh]  border-4 border-main">
        <div className=" p-8 w-full flex flex-col items-center overflow-auto space-y-6 ">
          {playlists.length === 0
            ? loading
            : playlists.reverse().map((playlist, i) => {
                if (
                  categorys[categoryIndex] === "all" ||
                  playlist[1].category === categorys[categoryIndex]
                ) {
                  return (
                    <Button
                      key={playlist[0]}
                      name={playlist[1].name}
                      func={() => selectPlaylist(playlist[1].videos, playlist[1].name, playlist[0])}
                      extra={"w-full text-sm md:text-xl"}
                      // index={i}
                    />
                  );
                }
                return null;
              })}
        </div>
      </div>

      <h1 className="text-xs md:text-xl mt-6">Create a new playlist</h1>
      <div className="w-[80vw] m-4 md:w-[50vw]">
        <AddPlaylist />
      </div>
    </div>
  );
}
