import React, { useContext, useState } from "react";
import { statesContext } from "../main"; // Adjust the path based on your project structure
import Button from "./Button"; // Adjust the path if needed
import { addPlaylistToDatabase, fetchPlaylists } from "../utils/database"; // Adjust the path if needed

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
    <div className="w-full flex items-center justify-center ">
      <input
        className="text-main text-xs p-4 w-[100%]"
        type="text"
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        placeholder="playlist name"
        value={inputValue}
      />
      <Button name="+" func={() => handleClick(inputValue)} extra={"text-xs"} />
    </div>
  );
}
