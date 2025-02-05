import React, { useContext, useState } from 'react';
import { statesContext } from '../main'; // Adjust the path based on your project structure
import Button from './Button'; // Adjust the path if needed
import { getVideoId, getVideoTitle,changeState } from '../utils/utilityFuncs'; // Adjust the path if needed
import { addItemToDatabase, fetchPlaylist } from  '../utils/database';
export default function AddVideo() {
  const [states, setStates] = useContext(statesContext);
  const [inputValue, setInputValue] = useState("");

  const handleClick = async (playlistId, video) => {
    const videoId = getVideoId(video);

    try {
      const title = await getVideoTitle(videoId);

      setInputValue("");
      addItemToDatabase(playlistId, { title: title, videoId: videoId });

      const res = await fetchPlaylist(playlistId);
      changeState(setStates, { databasePlayList: res.playList.videos });
    } catch (error) {
      console.error("Error handling click:", error);
    }
  };

  return (
    <div className="w-[100%] flex items-center justify-center m-4">
      <input
        className="text-main p-4 w-[100%] rounded-sm"
        type="text"
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        placeholder="Add youtube link"
        value={inputValue}
      />
      <Button
        name="add"
        func={() => handleClick(states.databasePlayListId, inputValue)}
        extra={"p-2"}
      />
    </div>
  );
}

