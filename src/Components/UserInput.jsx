import React, { useContext, useState } from "react";
import { statesContext } from "../main"; // Adjust the path based on your project structure
import { addPlaylistToDatabase, fetchPlaylists } from "../database"; // Adjust the path if needed

export default function UserInput(onChange) {
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
    <input
      className="text-main p-4 w-[100%] rounded-sm"
      type="text"
      onChange={onChange}
      placeholder="Name of the new playlist"
      value={inputValue}
    />
  );
}
