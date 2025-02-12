import { useContext } from "react";
import { statesContext } from "../main.jsx";
import Button from "../Components/Button.jsx";

export default function GameModesPage({}) {
  const [states, setStates, changePage] = useContext(statesContext);

  function selectMode(mode) {
    if (mode === "Pedro") {
      setStates((prevState) => ({
        ...prevState,
        gameMode: "GamePedro",
        playlistMaxNumber: 32,
        timeLimit: 180,
        randomEvents: 0
      }));
      changePage("GamePedro");
    }

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

    if (mode === "hell") {
      setStates((prevState) => ({
        ...prevState,
        gameMode: "GameFreeForAll",
        playlistMaxNumber: 300,
        timeLimit: 180,
        randomEvents: 80
      }));
      changePage("GameFreeForAll");
    }

    if (mode === "custom") {
      changePage("CustomGamePage");
    }
  }

  return (
    <>
      <Button name={"<"} func={() => changePage("PlaylistsPage")} extra={"text-xs m-5"} />

      <div className="w-[100vw] h-[80vh]  flex  items-center justify-center">
        <div className=" flex flex-col items-center justify-center ">
          <div className="grid m-4  gap-8">
            <h1 className="text-center  w-full md:text-xl">select the game mode</h1>

            <Button name="normal" func={() => selectMode("normal")} />
            {/* <Button
              name="Pedro's birthday"
              func={() => selectMode("Pedro")}
              extra="font-bold border-yellow-900 font-bold 
              bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-gradient"
            /> */}

            <Button
              name="quick"
              func={() => selectMode("quick")}
              extra="bg-teal-500 border-teal-900"
            />
            <Button
              name="hell"
              func={() => selectMode("hell")}
              extra={"bg-orange-500 border-orange-900"}
            />

            <Button
              name="Custom"
              func={() => selectMode("custom")}
              extra={"text-main bg-white  border-gray-700 "}
            />
          </div>
        </div>
      </div>
    </>
  );
}
