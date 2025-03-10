import React, { useContext, useState } from "react";
import { statesContext } from "../main"; // Adjust the path based on your project structure
import Button from "./Button"; // Adjust the path if needed
import {
  getVideoId,
  getVideoTitle,
  changeState,
  getPlaylistId,
  getVideoIds
} from "../utils/utilityFuncs"; // Adjust the path if needed
import { addItemToDatabase, fetchPlaylist } from "../utils/database";

export default function AddVideo() {
  const [states, setStates] = useContext(statesContext);
  const [inputValue, setInputValue] = useState("");

  const handleClick = async (playlistId, video) => {
    const videoId = getVideoId(video);
    const ytPlaylistId = getPlaylistId(video);

    async function sendVideo(videoId) {
      try {
        const title = await getVideoTitle(videoId);

        addItemToDatabase(playlistId, { title: title, videoId: videoId }).then(async () => {
          console.log(videoId + "uploded");
          setInputValue("");
          const res = await fetchPlaylist(playlistId);
          changeState(setStates, { databasePlayList: res.playList.videos });
        });
      } catch (error) {
        console.log(error);
      }
    }

    async function sendPalylist(playlist) {
      const playlistVideos = await getVideoIds(playlist);

      playlistVideos.forEach(  (video) => {
        sendVideo(video);
      });
    }

    ytPlaylistId != null ? sendPalylist(ytPlaylistId) : sendVideo(videoId);
  };

  return (
    <div className="w-[100%] flex items-center justify-center ">
      <input
        className="text-main text-[0.8rem] p-1 md:p-2 w-[100%] "
        type="text"
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        placeholder="youtube link"
        value={inputValue}
      />
      <Button
        name="+"
        func={() => handleClick(states.databasePlayListId, inputValue)}
        extra={"text-[0.8rem] px-[0.5rem] py-[0.3rem]  md:px-4 md:py-2"}
      />
    </div>
  );
}
