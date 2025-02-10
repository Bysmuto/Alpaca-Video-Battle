import { motion } from "framer-motion";
import sound from "../../public/sounds/type.mp3";
import { useRef } from "react";

export default function Button({ name, func, extra }) {
  const audioRef = useRef(new Audio(sound));
  function playSound() {
    audioRef.current.volume = 0.1;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  }

  return (
    <motion.button
      initial={{ scale: 1 }}
      whileHover={{ scale: 0.85 }}
      whileTap={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`px-8 py-4 bg-main leading-loose  text-lg border-b-4 border-l-4 border-green-900 shadow-inner 
        ${extra || ""}
        
  

        
        `}
      onClick={() => func()}
      onMouseEnter={playSound}
    >
      {name}
    </motion.button>
  );
}
