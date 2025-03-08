import { useContext } from "react";
import { statesContext } from "../main.jsx";
import Button from "../Components/Button.jsx";
import BackButton from "../Components/BackButton.jsx";
import Page from "../Components/Page.jsx";
import Frame from "../Components/Frame.jsx";

export default function GameModesPage({}) {
  const [states, setStates, changePage] = useContext(statesContext);

  function selectMode(mode) {
    if (mode === "normal") {
      setStates((prevState) => ({
        ...prevState,
        gameMode: "GameTournament",
        playlistMaxNumber: 32,
        timeLimit: 180,
        randomEvents: 0
      }));
      changePage("GameTournament");
    }

    if (mode === "quick") {
      setStates((prevState) => ({
        ...prevState,
        gameMode: "GameOneVsAll",
        playlistMaxNumber: 10,
        timeLimit: 60,
        randomEvents: 10
      }));
      changePage("GameOneVsAll");
    }

    if (mode === "full") {
      setStates((prevState) => ({
        ...prevState,
        gameMode: "GameFreeForAll",
        playlistMaxNumber: 500,
        timeLimit: 300,
        randomEvents: 80
      }));
      changePage("GameFreeForAll");
    }

    if (mode === "custom") {
      changePage("CustomGamePage");
    }
  }

  return (
    <Page>
      <BackButton />
      <h1 className="text-center mb-4 text-lg  md:text-2xl">select the mode</h1>

      <Frame width={"w-[80vw] md:w-[20vw]"}>
        <div className="grid gap-6">
          <Button name="normal" func={() => selectMode("normal")} />

          <Button
            name="quick"
            func={() => selectMode("quick")}
            extra="bg-teal-500 border-teal-900"
          />
          <Button
            name="full"
            func={() => selectMode("full")}
            extra={"bg-orange-500 border-orange-900 w-full"}
          />

          <Button
            name="Custom"
            func={() => selectMode("custom")}
            extra={"text-main bg-white  border-gray-700 "}
          />
        </div>
      </Frame>
    </Page>
  );
}
