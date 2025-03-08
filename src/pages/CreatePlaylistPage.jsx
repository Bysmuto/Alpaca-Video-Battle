import React, { useContext, useState } from "react";
import { statesContext, categories } from "../main"; // Adjust the path based on your project structure
import Button from "../Components/Button"; // Adjust the path if needed
import { addPlaylistToDatabase, fetchPlaylists } from "../utils/database"; // Adjust the path if needed
import Page from "../Components/Page";
import BackButton from "../Components/BackButton";

export default function CreatePlaylistPage() {
  const [states, setStates,changePage] = useContext(statesContext);
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleClick = async (playlistName) => {
    try {
      setInputValue("");

      addPlaylistToDatabase({ name: playlistName, category: selectedCategory, videos: "" });

 
      changePage('SelectPlaylistPage');
    } catch (error) {
      console.error("Error handling click:", error);
    }
    
  };

  return (
    <Page>
      <BackButton/>
      
      <div className="w-[80%] flex flex-col gap-6">
  
      <h1 className="text-center">New Playlist</h1>
        <input
          className="text-main text-[0.8rem] p-4 w-[100%]"
          type="text"
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          placeholder="playlist name"
          value={inputValue}
        />


        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          className="p-2 text-[0.8rem] text-gray-500"
        >
          <option value="" disabled hidden  >Select a category</option>
          {categories.map((category, index) => (
            category != 'all' && 
            <option key={index} value={category} className="p-2 text-xs text-main">
              {category}
            </option>
          ))}
        </select>

        <Button name="create" func={() => handleClick(inputValue)} extra={"text-xs"} />
      </div>

      
    </Page>
  );
}
