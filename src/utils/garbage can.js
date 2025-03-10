function windowFrames(params) {
  //  <WindowFrame
  //        title={<WrappedText text={videoTitle} textColor="text-main" />}
  //        content={<YoutubeVideo videoId={videoId} />}
  //      />

  {
    /* export default function WindowFrame({title,content,extra}) {
  return (
      <div className={`flex flex-col w-full h-full border-4 border-main bg-white  ${extra || ""}`}>
          <div id='winTitle' className="flex text-main justify-between items-center bg-white px-2 py-1 border-b-4 border-green-500">
           {title}
            <div className="flex items-center">
              <span className="text-3xl text-black mx-1 font-mono">-</span>
              <span className="text-3xl text-black mx-1 font-mono">□</span>
              <span className="text-3xl text-red-500 mx-1 font-mono font-extrabold">
                ×
              </span>
              
            </div>
          </div>
          <div id='winContent' className="bg-black border-b-4 border-green-500 w-full h-full">
            {content}
          </div>
        </div>
  )
} */
  }
}

function disableVote() {
  // const buttonDisabled = useRef(false);
  // if (buttonDisabled.current) return;
  // buttonDisabled.current = true;
  // setTimeout(() => {
  //   buttonDisabled.current = false;
  // }, 1500);
}

function routes() {
  // import { BrowserRouter, Routes, Route } from "react-router-dom";
  // import { useNavigate } from "react-router-dom";
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (states.currentPage === "start") navigate("/");
  //   if (states.currentPage === "PlaylistsPage") navigate("/PlaylistsPage");
  //   if (states.currentPage === "PlaylistPage") navigate("/PlaylistPage");
  //   if (states.currentPage === "GameModesPage") navigate("/GameModesPage");
  //   if (states.currentPage === "CustomGamePage") navigate("/CustomGamePage");
  //   if (states.currentPage === "GameTournament") navigate("/GameTournament");
  //   if (states.currentPage === "GameOneVsAll") navigate("/GameOneVsAll");
  //   if (states.currentPage === "GameFreeForAll") navigate("/GameFreeForAll");
  //   if (states.currentPage === "WinnerPage") navigate("/WinnerPage");
  // }, [states.currentPage, navigate]);

  {
    /* <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/PlaylistsPage" element={<PlaylistsPage />} />
        <Route path="/PlaylistPage" element={<PlaylistPage />} />
        <Route path="/GameModesPage" element={<GameModesPage />} />
        <Route path="/CustomGamePage" element={<CustomGamePage />} />
        <Route path="/GameTournament" element={<GameTournament />} />
        <Route path="/GameOneVsAll" element={<GameOneVsAll />} />
        <Route path="/GameFreeForAll" element={<GameFreeForAll />} />
        <Route path="/WinnerPage" element={<WinnerPage />} />
      </Routes> */
  }

  // <BrowserRouter basename="/Alpaca-Video-Battle">
  // <App />
  // </BrowserRouter>
}

function autoplayOnHover(params) {
  // import { useState } from "react";
  // export default function Video({ videoId, extra }) {
  //   const [videoSrc, setVideoSrc] = useState(
  //     `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0`
  //   );
  //   const handleMouseEnter = () => {
  //     setVideoSrc(`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1`);
  //   };
  //   const handleMouseLeave = () => {
  //     setVideoSrc(`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0`);
  //   };
  //   return (
  //     <iframe
  //       src={videoSrc}
  //       onMouseEnter={handleMouseEnter}
  //       onMouseLeave={handleMouseLeave}
  //       allow="autoplay; encrypted-media"
  //       allowFullScreen
  //       className={`w-full h-full border-4 border-green-500  ${extra || ""}`}
  //     />
  //   );
  // }
}

function events(param) {
  //events
  // const [hideVideo1, setHideVideo1] = useState(false);
  // const [hideVideo2, setHideVideo2] = useState(false);
  // const [makeCopies, setMakeCopies] = useState(false);
  // const [skipButton, setSkipButton] = useState(false);
  // const [forceRender, setForceRender] = useState(false);
  // useEffect(() => {
  //   if (currentPlaylist.length > 3 && Math.floor(Math.random() * 100) < states.randomEvents) {
  //     let eventSkip = () => {
  //       setSkipButton(true);
  //     };
  //     let eventTime = () => {
  //       setSeconds(10);
  //     };
  //     let eventHide = () => {
  //       let random = Math.random();
  //       if (random < 0.4) {
  //         setHideVideo1(true);
  //       } else if (random < 0.8) {
  //         setHideVideo2(true);
  //       } else {
  //         setHideVideo1(true);
  //         setHideVideo2(true);
  //       }
  //     };
  //     let eventCopy = () => {
  //       setMakeCopies(true);
  //     };
  //     let events = [eventSkip, eventHide, eventTime, eventCopy];
  //     events[Math.floor(Math.random() * events.length)]();
  //   }
  // }, [currentPlaylist]);
  // function resetEvents() {
  //   setHideVideo1(false);
  //   setHideVideo2(false);
  //   setSkipButton(false);
  //   setMakeCopies(false);
  //   setSeconds(states.timeLimit);
  // }
  // function eventWarings() {
  //   if (seconds === 10) return <h1 className="m-2 w-full text-center">you only have 10 seconds</h1>;
  //   if (makeCopies) {
  //     return <h1 className="m-2 w-full text-center">2 copies of the loser will be made</h1>;
  //   }
  //   if (skipButton) {
  //     return <h1 className="m-2 w-full text-center">You can skip if you want</h1>;
  //   }
  //   if (hideVideo1 && hideVideo2) {
  //     return <h1 className="m-2 w-full text-center">Both videos are hidden behind alpacas</h1>;
  //   }
  //   if (hideVideo1) {
  //     return (
  //       <h1 className="m-2 w-full text-center ">the first video is hidden behind the alpaca</h1>
  //     );
  //   }
  //   if (hideVideo2) {
  //     return <h1 className="m-2 text-center ">the second video is hidden behind the alpaca</h1>;
  //   }
  // }
}
