import React, { useContext, useEffect, useState } from "react";
import { statesContext,categories } from "../main";
import { fetchPlaylists} from "../utils/database";
import { changeState ,shuffleArray } from "../utils/utilityFuncs";
import Button from "../Components/Button";
import Loading from "../Components/Loading";
import Page from "../Components/Page";

export default function SelectPlaylistPage() {
  const [, setStates, changePage] = useContext(statesContext);
  const [playlists, setPlaylists] = useState([]);


  const [categoryIndex, setCategoryIndex] = useState(0); // Start at index 0

  const nextCategory = () => {
    setCategoryIndex((prevIndex) => (prevIndex + 1) % categories.length);
  };

  const prevCategory = () => {
    setCategoryIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
  };

  useEffect(() => {
    fetchPlaylists().then((res) => {
      console.log(res);
      let playlistLists = Object.entries(res.playLists);
      console.log(playlistLists);
      setPlaylists( shuffleArray( playlistLists));
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

  return (
    <Page>
      <h1 className="mb-8 text-md md:text-xl">Select a playlist</h1>

      <div className="w-[80vw] md:w-[50vw] flex justify-between items-center p-3  ">
        <Button
          name={"<"}
          func={prevCategory}
          extra={"text-md px-[0.8rem] py-[0.3rem]  md:px-6 md:py-2"}
        />

        <h1 className="text-md text-center md:text-2xl">{categories[categoryIndex]}</h1>

        <Button
          name={">"}
          func={nextCategory}
          extra={"text-md px-[0.8rem] py-[0.3rem]  md:px-6 md:py-2"}
        />
      </div>

      <div className="flex flex-col m-4 p-2 space-y-5 items-center w-[80vw] md:w-[50vw] h-[60vh]  border-4 border-main">
        <div className=" p-8 w-full flex flex-col items-center overflow-auto space-y-6 ">
          {playlists.length === 0 ? (
            <Loading />
          ) : (
            playlists.reverse().map((playlist, i) => {
              if (
                categories[categoryIndex] === "all" ||
                playlist[1].category === categories[categoryIndex]
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
            })
          )}
        </div>
      </div>

          
      <Button name={'create playlist'} func={()=>changePage("CreatePlaylistPage")} extra={' text-sm md:text-xl w-[80%] mt-4'}/>
     
    </Page>
  );
}
