import React, { useContext } from "react";
import { statesContext } from "../main"; // Adjust the path based on your project structure
import Button from "../Components/Button"; // Adjust the path if needed
import logo from "../../public/logo.gif"; // Adjust the path if needed
import Page from "../Components/Page";

export default function StartPage() {
  const [, , changePage] = useContext(statesContext);

  return (
    <Page>
      <img className="w-[90%] md:w-[35%]" src={logo} alt="logo" /> <br />
      <Button name="start" func={() => changePage("SelectPlaylistPage")} />
    </Page>
  );
}
