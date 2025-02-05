import React, { useContext } from "react";
import { statesContext } from "../main"; // Adjust the path based on your project structure
import Button from "../Components/Button"; // Adjust the path if needed
import WindowFrame from "../Components/WindowFrame";
import WrappedText from "../Components/WrappedText";
import YoutubeVideo from "../Components/YoutubeVideo";

// Adjust the path if needed
export default function WinnerPage({ videoId, videoTitle }) {
  const [states, setStates, changePage] = useContext(statesContext);

  return (
    <>
      <div className="flex justify-center h-[100vh]">
        <div className="flex flex-col items-center space-y-8 justify-center w-[80%] p-6">
          <h1 className="text-2xl">And the winner is ...</h1>
          <div className="w-full h-full">
            <WindowFrame
              title={
                <WrappedText text={states.winner.title} textColor="text-main" />
              }
              content={<YoutubeVideo videoId={states.winner.videoId} />}
            />
          </div>

          <Button
            name="Reset"
            func={() => {
              changePage(states.changePage);
              window.location.reload();
            }}
          />
        </div>
      </div>
    </>
  );
}
