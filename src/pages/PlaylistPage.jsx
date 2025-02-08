import React, { useContext } from "react";
import { statesContext } from "../main"; // Adjust the path if needed
import Button from "../Components/Button"; // Adjust the path if needed
import PlaylistInfo from "../Components/PlaylistInfo"; // Adjust the path if needed
import AddVideo from "../Components/AddVideo"; // Adjust the path if needed
import VideoPlaylist from "../Components/VideoPlaylist";
import WindowFrame from "../Components/WindowFrame";

export default function PlaylistPage() {
  const [states, setStates, changePage] = useContext(statesContext);

  return (
    <>
      <div className="flex flex-col items-center space-y-6">
        <div className="w-full flex justify-between items-center p-3  ">
          <Button name={"<"} func={() => changePage("PlaylistsPage")} extra={"text-xs"} />
        </div>

        <div className="flex flex-col  items-center w-[80vw] space-y-6">
          <PlaylistInfo />

          <Button name="play" func={() => changePage("GameModesPage")} />

          <div className="h-[55vh] w-[80vw] md:w-[40vw] border-4 border-main p-4 overflow-auto">
            {states.databasePlayList ? (
              Object.entries(states.databasePlayList)
                .reverse()
                .map(([key, video], index) => (
                  <VideoPlaylist key={index} video={video} videoKey={key} />
                ))
            ) : (
              <p>No videos available.</p>
            )}
          </div>
          <div className="">
            <AddVideo />
          </div>
        </div>
      </div>
    </>
  );
}
