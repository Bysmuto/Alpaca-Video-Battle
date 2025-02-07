import Button from "./Button";
import WrappedText from "./WrappedText";
import YoutubeVideo from "./YoutubeVideo";
import WindowFrame from "./WindowFrame";
import { motion } from "framer-motion";


import { useEffect, } from "react";

export function FreeForAllCard({ videoId, videoTitle, vote, isRight }) {
  

  function handleClick() {
    vote()
   
  }

  return (
    <motion.div
      initial={{ y: -500 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 140, damping: 12 }}
      className="space-y-5 flex flex-col items-center justify-center h-[60vh] w-[40vw] m-4"
    >
      <WindowFrame
        title={<WrappedText text={videoTitle} textColor="text-main" />}
        content={<YoutubeVideo videoId={videoId} />}
      />
      <Button name="vote" func={handleClick} extra="w-full" />
    </motion.div>
  );
}

export function OneVsAllCard({ videoId, videoTitle, vote }) {
  return (
    <motion.div
      initial={{ y: 320 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
      className="space-y-5 flex flex-col items-center justify-center h-[60vh] w-[40vw] m-4"
    >
      <WindowFrame
        title={<WrappedText text={videoTitle} textColor="text-main" />}
        content={<YoutubeVideo videoId={videoId} />}
      />
      <Button name="vote" func={vote} extra="w-full" />
    </motion.div>
  );
}

export function TournamentCard({ videoId, videoTitle, vote, isRight }) {

  return (
    <motion.div
      initial={{ x: isRight ? "-80vw" : "80vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
      className="space-y-5 flex flex-col items-center justify-center h-[60vh] w-[40vw] m-4"
    >
      <WindowFrame
        title={<WrappedText text={videoTitle} textColor="text-main" />}
        content={<YoutubeVideo videoId={videoId} />}
      />
      <Button name="vote" func={vote} extra="w-full" />
    </motion.div>
  );
}

export function AlpacaCard({ vote }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="space-y-5 flex flex-col items-center justify-center h-[60vh] w-[40vw] m-4"
    >
      <WindowFrame
        title={<WrappedText text={"The Alpaca"} textColor="text-main" />}
        content={<YoutubeVideo videoId={"-MFFBA8bdd8"} />}
      />
      <Button name="vote" func={vote} extra="w-full" />
    </motion.div>
  );
}
