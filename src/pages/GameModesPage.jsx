import { useContext, useState,} from "react";
import { statesContext } from "../main.jsx";
import { Button } from "../components.jsx";
import {GameTournament} from "./GamePage.jsx";

export default function GameModesPage({}) {
  const [selected, setSelected] = useState(false);
  const [states, setStates] = useContext(statesContext);

  function selectMode(mode) {

    setSelected(true);
  }

  return (
    <>
      {!selected ? (
        <div className=" h-[100vh] flex items-center justify-center">
          <div className="flex flex-col w-[40vw]">
            <h1 className="text-center m-20">GAME MODE</h1>
            <div className=" flex x justify-center space-x-5">
              <Button name="Hell" func={() => setSelected(true)} />
              <Button name="Normal" func={() => setSelected(true)} />
              <Button name="Quick" func={() => setSelected(true)} />
            </div>
          </div>
        </div>
      ) : (
        <GameTournament timeLimit={2000} playlistMaxNumber={2} />
      )}
    </>
  );
}
