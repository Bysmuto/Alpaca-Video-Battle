import React, { useContext, useState } from 'react';
import { statesContext } from '../main'; ; // Adjust the path based on your project structure
import Button from './Button'; // Adjust the path if needed
import { addPlaylistToDatabase, fetchPlaylists } from '../database'; // Adjust the path if needed

export default function AddPlaylist() {
  const [states, setStates] = useContext(statesContext);
  const [inputValue, setInputValue] = useState("");

  const handleClick = async (playlistName) => {
    try {
      setInputValue("");

      addPlaylistToDatabase({ name: playlistName, videos: "" });

      const res = await fetchPlaylists();
      location.reload();
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
        placeholder="Name of the new playlist"
        value={inputValue}
      />
      <Button name="add" func={() => handleClick(inputValue)} extra={"p-2"} />
    </div>
  );
}

