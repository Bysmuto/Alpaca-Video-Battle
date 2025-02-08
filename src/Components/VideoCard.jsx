import Button from "./Button";

import YoutubeVideo from "./YoutubeVideo";

import { motion } from "framer-motion";

export function FreeForAllCard({ videoId, vote }) {
  return (
    <motion.div
      initial={{ y: -500 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 140, damping: 12 }}
      className="space-y-5 flex flex-col items-center justify-center h-[70vh]  md:h-[60vh] md:w-[40vw] md:m-4 "
    >
      <YoutubeVideo videoId={videoId} extra={"border-orange-500"} />

      <Button
        name="vote"
        func={() => vote()}
        extra="w-full bg-orange-500 border-orange-900 hover:bg-white hover:text-orange-500"
      />
    </motion.div>
  );
}

export function OneVsAllCard({ videoId, vote }) {
  return (
    <motion.div
      initial={{ y: 320 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
      className="space-y-5 flex flex-col items-center justify-center h-[70vh]  md:h-[60vh] md:w-[40vw] md:m-4 "
    >
      <YoutubeVideo videoId={videoId} extra="border-teal-500  " />

      <Button name="vote" func={vote} 
       extra="w-full bg-teal-500 border-teal-900 hover:bg-white hover:text-teal-500"
      />
    </motion.div>
  );
}

export function TournamentCard({ videoId, vote, isRight }) {
  return (
    <motion.div
      initial={{ x: isRight ? "-80vw" : "80vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
     className="space-y-5 flex flex-col items-center justify-center h-[70vh]  md:h-[60vh] md:w-[40vw] md:m-4 "
    >
      <YoutubeVideo videoId={videoId} />
      <Button name="vote" func={vote} extra="w-full  hover:bg-white hover:text-main" />
    </motion.div>
  );
}
export function WinnerCard({ videoId, func }) {
  function handleClick() {
    func();
  }

  return (
    <motion.div
      initial={{ y: 500, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 250, damping: 6 }}
      className="space-y-5 flex flex-col items-center justify-center h-[70vh]  md:h-[60vh] md:w-[40vw] md:m-4 "
    >
      <YoutubeVideo videoId={videoId} extra="border-8 border-yellow-500"/>
      <Button name="restart" func={handleClick} extra="w-full bg-yellow-500 border-yellow-900" />
    </motion.div>
  );
}

export function AlpacaCard({ vote }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    className="space-y-5 flex flex-col items-center justify-center h-[70vh]  md:h-[60vh] md:w-[40vw] md:m-4 "
    >
      <YoutubeVideo videoId={"-MFFBA8bdd8"} />

      <Button name="vote" func={vote} extra="w-full" />
    </motion.div>
  );
}
