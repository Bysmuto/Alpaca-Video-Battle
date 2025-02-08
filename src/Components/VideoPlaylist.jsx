import React, { useContext } from "react";
import { statesContext } from "../main"; // Adjust the path based on your project structure
import Button from "./Button"; // Adjust the path if needed
import WrappedText from "./WrappedText";
import { changeState } from "../utils/utilityFuncs"; // Adjust the path if needed
import { removeItemFromDatabase, fetchPlaylist } from "../utils/database";

export default function VideoPlaylist({ video, videoKey }) {
  const [states, setStates] = useContext(statesContext);

  function removeVideo(videoId) {
    removeItemFromDatabase(states.databasePlayListId, videoId);
    fetchPlaylist(states.databasePlayListId).then((res) => {
      changeState(setStates, { databasePlayList: res.playList.videos });
    });
    console.log("video removed " + videoId);
  }

  return (
    <div className="flex justify-between m-3">
      
      <WrappedText
        key={videoKey}
        text={
          <a
            href={"https://www.youtube.com/watch?v=" + video.videoId}
            target="_blank"
            rel="noopener noreferrer"
          >
            {video.title}
          </a>
        }
      />

      <Button
        name="X"
        func={() => removeVideo(videoKey)}
        extra={" text-xs px-1 py-0 p-4 md:px-8 md:py-4"}
      />
    </div>
  );
}
