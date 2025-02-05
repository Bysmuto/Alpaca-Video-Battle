import { motion } from "framer-motion";
export default function Button({ name, func, extra }) {
  return (
    <motion.button
      initial={{ scale: 1 }}
      whileHover={{  scale: 0.85 }} // Button scales up when hovered
      whileTap={{ scale: 1.05 }} // Button scales down when clicked
      transition={{ type: "spring", stiffness: 300 }}
      className={`px-8 py-4 bg-main text-lg border-b-4 border-l-4 border-green-900 shadow-inner 
        active:border-t-4 active:border-r-4 active:border-green-900 active:border-gray-200 active:translate-y-[2px] 
        ${extra || ""}`}
      onClick={() => func()}
    >
      {name}
    </motion.button>
  );
}
