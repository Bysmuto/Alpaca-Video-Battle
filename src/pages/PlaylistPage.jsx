import React, { useContext } from "react";
import { statesContext } from "../main";// Adjust the path if needed
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
        <WindowFrame
          title={<PlaylistInfo />}
          content={
            <>
              <div className="flex justify-center">
                <AddVideo />
              </div>

              <div className="h-[70vh] p-4 overflow-auto">
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
            </>
          }
        />

        <Button name="play" func={() => changePage("GameModesPage")} />
      </div>
    </>
  );
}
