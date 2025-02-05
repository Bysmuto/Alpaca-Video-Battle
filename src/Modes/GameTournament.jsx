import { useContext, useEffect, useState } from "react";
import { preparePlaylist, separateIntoPairs } from "../utils/utilityFuncs.js";
import { statesContext } from "../main.jsx";
import Round from "../Components/Round.jsx";
import Timer from "../Components/Timer.jsx";
import { TournamentCard } from "../Components/VideoCard.jsx";
import WinnerPage from "../pages/WinnerPage.jsx";

export default function GameTournament({}) {
  const [states, setStates] = useContext(statesContext);

  const [currentPlaylist, setCurrentPlaylist] = useState(
    preparePlaylist(Object.values(states.databasePlayList))
  );

  const [roundWinners, setRoundWinners] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (currentPlaylist.length === 0 && roundWinners.length > 1) {
      let newPairs = separateIntoPairs(roundWinners);
      setCurrentPlaylist(newPairs);
      setRoundWinners([]);
    }
    if (currentPlaylist.length === 0 && roundWinners.length === 1) {
      setWinner(roundWinners[0]);
      setStates((prev) => ({ ...prev, winner: roundWinners[0] }));
    }
    console.log(currentPlaylist);
  }, [currentPlaylist]);

  function vote(videoIndex) {
    const roundWinner = currentPlaylist[0][videoIndex];
    setRoundWinners((prevNextRound) => [...prevNextRound, roundWinner]);

    setCurrentPlaylist((prevNextRound) => {
      return [...prevNextRound].slice(1);
    });
  }

  function vote(videoIndex) {
    const roundWinner = currentPlaylist[0][videoIndex];
    setRoundWinners((prevNextRound) => [...prevNextRound, roundWinner]);

    setCurrentPlaylist((prevNextRound) => {
      return [...prevNextRound].slice(1); // <-- Ensure new reference
    });
  }

  if (currentPlaylist.length >= 1) {
    return (
      <div className="flex flex-col items-center justify-center  ">
        <div className="w-full flex justify-between p-3">
          <Timer
            seconds={states.timeLimit}
            videoIdsToRemove={currentPlaylist[0]}
            funcToVote={(id) => vote(id)}
          />
        </div>
        <div className="m-4 w-full flex justify-center">
          <Round
            stateChange={currentPlaylist}
            maxRound={currentPlaylist.length}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-10 ">
          <TournamentCard
            key={currentPlaylist[0][0].videoId}
            videoId={currentPlaylist[0][0].videoId}
            videoTitle={currentPlaylist[0][0].title}
            vote={() => vote(1)}
          />

          <TournamentCard
            key={currentPlaylist[0][1].videoId}
            videoId={currentPlaylist[0][1].videoId}
            videoTitle={currentPlaylist[0][1].title}
            vote={() => vote(0)}
          />

          {/* {currentPlaylist[0].map((video, index) => (
            <TournamentCard
              key={video.videoId}
              videoId={video.videoId}
              videoTitle={video.title}
              vote={() => vote(index)}
            />
          ))} */}
        </div>
      </div>
    );
  }
  if (winner) {
    return <WinnerPage />;
  }
}
