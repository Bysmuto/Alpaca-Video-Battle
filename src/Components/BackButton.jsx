import React, { useContext } from "react";
import Button from "./Button";
import { statesContext } from "../main";

function BackButton() {
  const [states, , changePage] = useContext(statesContext);

  function back() {

    if (states.currentPage === "PlaylistPage" || states.currentPage === "GameModesPage" || states.currentPage === "CreatePlaylistPage" ) {
      changePage("SelectPlaylistPage");
    }
    if ( states.currentPage === "CustomGamePage" ) {
        changePage("GameModesPage");
      }

  }

  return (
    <div className=" p-3 absolute top-0 left-0 ">
      <Button name={"<"} func={back} extra={"text-xs px-[1rem] py-[0.5rem]  md:px-8 md:py-4"} />
    </div>
  );
}

export default BackButton;
