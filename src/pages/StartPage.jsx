 
import React, { useContext } from 'react';
import { statesContext } from '../main'; // Adjust the path based on your project structure
import Button from '../Components/Button'; // Adjust the path if needed
import logo from "../../public/logo.gif";; // Adjust the path if needed
import WindowFrame from '../Components/WindowFrame';

export default function StartPage() {
  const [states, setStates, changePage] = useContext(statesContext);

  return (
    <>
      <div className="flex items-center justify-center h-[100vh]">
        <div className="flex flex-col items-center w-[80vw]">
          <img className="w-[60vw]" src={logo} alt="logo" /> <br />
          <Button name="start" func={() => changePage("PlaylistsPage")} />
      
        </div>
      </div>
    </>
  );
}
