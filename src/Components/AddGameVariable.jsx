import { useContext, useState} from "react";
import { statesContext } from "../main.jsx";


export  default function AddGameVariable({variable,placeholder}) {
  const [states, setStates] = useContext(statesContext);



  return (
    <div className=" w-[50%] flex items-center justify-center m-4">
      <input
  className="text-main p-4 w-[100%] rounded-sm"
  type="number"
  onChange={(event) => {
    setStates((prevState) => {
      const newState = { ...prevState };
      if (variable === 'playlistMaxNumber') {
        newState.playlistMaxNumber = +event.target.value; 
      }
      if (variable === 'timeLimit') {
        newState.timeLimit = +event.target.value; 
      }
      if (variable === 'randomEvents') {
        newState.randomEvents = +event.target.value; 
      }
      return newState;
    });
  }}
  placeholder={placeholder}
/>

    </div>
  );
}