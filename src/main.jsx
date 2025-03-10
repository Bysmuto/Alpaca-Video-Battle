import { createContext, useState, useEffect } from "react";

import { createRoot } from "react-dom/client";

import "./css/main.css";

import GameFreeForAll from "./Modes/GameFreeForAll.jsx";
import GameOneVsAll from "./Modes/GameOneVsAll.jsx";
import GameTournament from "./Modes/GameTournament.jsx";
import GameModesPage from "./pages/GameModesPage.jsx";
import CustomGamePage from "./pages/CustomGamePage.jsx";
import StartPage from "./pages/StartPage.jsx";
import SelectPlaylistPage from "./pages/SelectPlaylistPage.jsx";
import PlaylistPage from "./pages/PlaylistPage.jsx";
import WinnerPage from "./pages/WinnerPage.jsx";
import CreatePlaylistPage from "./pages/CreatePlaylistPage.jsx";

const list = [
  {
    title: "The Way of the Samurai",
    videoId: "oRUvfEIuQrA"
  },
  {
    title: "Enemy Territory [Westopolis Remix] - Sonic Forces [OST]",
    videoId: "y2Pay-MYsFw"
  },
  {
    title: "Time to Fight! (Bionis' Shoulder) - Xenoblade Chronicle: Future Connected OST [05]",
    videoId: "gdqGq0rZ5LU"
  },
  {
    title: "Assassin's Creed Odysse: Legend of the Eagle Bearer (Main Theme) | The Flight",
    videoId: "eA0nbtxfeq4"
  },
  {
    title: "Darkness",
    videoId: "ysUhh-JQZRw"
  },
  {
    title: "Noisia - Devil May Cry Soundtrack - 28 - Kat's Theme (Bonus)",
    videoId: "sZHc3zpncMk"
  },
  {
    title: "The Blood Harbor Ripper",
    videoId: "Xa--9CJ-Uic"
  },
  {
    title: "サンレス水郷",
    videoId: "tbktye3f0oo"
  },
  {
    title: "ハンマーヘッド",
    videoId: "_bYZ34u1Piw"
  },
  {
    title: "The Town Inside Me",
    videoId: "uQTBzmBDSv0"
  },
  {
    title: "Arcana of Zipacna",
    videoId: "mhjCyv6wulA"
  },
  {
    title:
      "Gustavo Santaolalla - The Last of Us (Main Theme) | The Last of Us (Video Game Soundtrack)",
    videoId: "Pt1pOY3_W64"
  },
  {
    title: "Love Song For A Dead Man - Call Of Duty Black Ops II",
    videoId: "KH-BgU8N-Mk"
  },
  {
    title: "Devil Trigger - Nero's Battle Theme from Devil May Cry 5 OST (HD)",
    videoId: "tnAoq3_6f5M"
  },
  {
    title: "Dragonborn",
    videoId: "6fILxnBH1Tg"
  },
  {
    title: "Full Moon Full Life",
    videoId: "hWhgrA2dhrk"
  },
  {
    title: "Main Theme (Full Version) - The Legend of Zeld: Tears of the Kingdom OST",
    videoId: "FKLHDgbTD0k"
  },
  {
    title: "Crash Bandicoot Main Theme",
    videoId: "QzG5QWcKTSc"
  },
  {
    title: "Main Theme - Super Smash Bro: Brawl",
    videoId: "zeKE0NHUtUw"
  },
  {
    title: "FFVII REMAK: J-E-N-O-V-A ー胎動ー",
    videoId: "2zvHLGPpkO0"
  },

  {
    title: "Street Fighter 5 - Ryu's Theme (SFV OST)",
    videoId: "oUn549UmSlw"
  },
  {
    title: "Maiden Voyage (Original Game Soundtrack)",
    videoId: "rvLs-9SA9i0"
  },
  {
    title: "Bayonetta - Fly Me To The Moon (Climax)",
    videoId: "EV6E13xODyA"
  },
  {
    title: "誰がために・改",
    videoId: "aTuE4BROrjA"
  },
  {
    title: "Devil May Cry 5 OST - Any Special Orders? (Nico's Shop)",
    videoId: "27qPvCq42lY"
  },
  {
    title: "Cult of the Lamb [Official] - Nudism",
    videoId: "f0SxVJ9Wpxw"
  },
  {
    title: "Horizon Zero Dawn OST - Aloy's Theme",
    videoId: "_w9B7uwLZeI"
  },
  {
    title: '"Endwalker – Footfalls" with Official Lyrics | Final Fantasy XIV',
    videoId: "pmP-1zELQZg"
  },
  {
    title: "Elden Ring",
    videoId: "KBP1zYwBzOE"
  },
  {
    title: "A Hat in Time OST [Seal the Deal] - Peace and Tranquility",
    videoId: "SHvhps47Lmc"
  },
  {
    title: "Enter the Gungeon - Enter the Gungeon - OST",
    videoId: "xZzWiFjsbM0"
  },
  {
    title: "Grzegorz Mazur - The Last Goodbye",
    videoId: "DEVoC-LJIhc"
  },
  {
    title: "Moonlight Canyon - Kirby and the Forgotten Land OST [055]",
    videoId: "CqigaFzqhys"
  },
  {
    title: "Disk 02-06 I'm Every Reaper - Vampire Survivors Original Soundtrack",
    videoId: "4OksbeQdXRo"
  },
  {
    title: "Together Till Infinity",
    videoId: "l2otQZ70SUA"
  },
  {
    title: "Techno Syndrome (Mortal Kombat)",
    videoId: "Sr1bLLvsbh0"
  },
  {
    title: "Mischievous Alchemy",
    videoId: "PizL44RpB0s"
  },
  {
    title: "Bayonetta 2 - Battle OST 1 - Moon River ( Climax Mix )",
    videoId: "sXhhdNL05sY"
  },
  {
    title: "Harvest Moon Back to Nature Main Theme Song",
    videoId: "BLJ_o7urUVc"
  },
  {
    title: "Every Day Is Night",
    videoId: "H-AfGh8gmiQ"
  },
  {
    title: "Apex Legend: Main Theme",
    videoId: "Xq0joZ24D9Y"
  },
  {
    title: "Secunda",
    videoId: "iqkQRgGdAPo"
  },
  {
    title: "Bully - Soundtrack Main Theme",
    videoId: "7RU7CohvsMU"
  },
  {
    title: "Can You Feel the Sunshine - Sonic R [OST]",
    videoId: "dgJWZiBt6_w"
  },
  {
    title: "Dragon Ball Z Budokai 3 - Opening Cinematic Remastered (4k)",
    videoId: "4_-eEf91hwo"
  },
  {
    title: "Braum, the Heart of the Freljord | Login Screen - League of Legends",
    videoId: "F8cPDpXnQa0"
  },
  {
    title: "Sonic Mania OST - Studiopolis Act 1",
    videoId: "NIWyZmFSep0"
  },
  {
    title: "Regicide",
    videoId: "0F9Nvxyt9t8"
  },
  {
    title: "Bloodborne Soundtrack OST - Ludwig, The Accursed & Holy Blade (The Old Hunters)",
    videoId: "ALbVEmzY5S4"
  },
  {
    title: "Stickerbrush Symphony - Super Smash Bros. Brawl",
    videoId: "gJkVwt_JJXo"
  },
  {
    title: "Left Behind",
    videoId: "6s8wrKBLe14"
  },
  {
    title: "Animal Crossing New Horizons  - Main Theme Song",
    videoId: "lI_C1Bjdqn4"
  },
  {
    title:
      "Kingdom Hearts Simple and Clean by Utada Hikaru 720p HD Audio Boost Remix w/Lyrics in Description",
    videoId: "UigzN-4JR14"
  },
  {
    title: "Final Fantasy 13 OST Blinded By Light ( Main Battle Theme )",
    videoId: "RPtq1Bpf6q4"
  },
  {
    title: "Combichrist - Never Surrender [HQ] [Devil May Cry Soundtrack]",
    videoId: "_9J8ccza1OI"
  },
  {
    title: "League of Legends - Light and Shadow (Hiroyuki Sawano feat. Gemie) | Official music",
    videoId: "cmzVnvl3xQg"
  },
  {
    title: "The Struggle",
    videoId: "sQffJpzreoE"
  },
  {
    title: "「Azura's Dance」 (Nohr Jap. Ver.) Extended 【Fire Emblem Fates】",
    videoId: "Hh4L4RijCsw"
  },
  {
    title: "Transistor Original Soundtrack - The Spine",
    videoId: "41tIUr_ex3g"
  },
  {
    title: "Mick Gordon - 11. BFG Division",
    videoId: "QHRuTYtSbJQ"
  },
  {
    title: "1. God of War | God of War OST",
    videoId: "y9hh91-2iaA"
  },
  {
    title: "BLACK OPS 2 ZOMBIE: OFFICIAL Theme Song",
    videoId: "bPj_SmRW4lM"
  },
  {
    title:
      "【Haloweak】NARWHAL 「Punishin: Gray Raven OST - 极地暗流」 【パニシン:グレイレイヴン】Official",
    videoId: "q2DBeby7ni8"
  },
  {
    title: "Crimson Cloud - V's Battle Theme from Devil May Cry 5 (Extended HD Version)",
    videoId: "mDdQBxbdj6k"
  },
  {
    title: "Bury the Light - Vergil's battle theme from Devil May Cry 5 Special Edition",
    videoId: "Jrg9KxGNeJY"
  },
  {
    title: "A Hat in Time OST - Main Theme",
    videoId: "LijvcUx2LNg"
  },
  {
    title: "Terraria Music - Ocean",
    videoId: "fdi06Y6oFDo"
  },
  {
    title: "Grand Theft Auto IV Theme Song *[best quality]*",
    videoId: "pWO718iy5mY"
  },
  {
    title: "David Orr- Four Brave Champions (Castle Crashers Main Theme)",
    videoId: "gGJenum-clc"
  },
  {
    title: "Assassin's Creed IV Black Flag - Assassin's Creed IV Black Flag Main Theme (Track 01)",
    videoId: "UNREuwdJCw0"
  },
  {
    title: "Konga Conga Kappa",
    videoId: "Eon9jJDK2q8"
  }
];

export const categories = [
  "all",
  "k-pop",
  "anime",
  "gaming",
  "pop",
  "tv shows",
  "other",
  "rock",
  "rap"
];

export const statesContext = createContext();
function App() {
  const [states, setStates] = useState({
    currentPage: "start",

    databasePlayListId: "",
    databasePlayList: list,
    databasePlayListName: "",

    gameMode: "",
    timeLimit: 90,
    playlistMaxNumber: 32,

    winner: {}
  });

  useEffect(() => {
    console.log(states);
  }, [states]);

  function changePage(page) {
    setStates((prev) => ({ ...prev, currentPage: page }));
  }

  return (
    <statesContext.Provider value={[states, setStates, changePage]}>
      <>
        {states.currentPage === "start" && <StartPage />}
        {states.currentPage === "SelectPlaylistPage" && <SelectPlaylistPage />}
        {states.currentPage === "CreatePlaylistPage" && <CreatePlaylistPage />}
        {states.currentPage === "PlaylistPage" && <PlaylistPage />}
        {states.currentPage === "GameModesPage" && <GameModesPage />}
        {states.currentPage === "CustomGamePage" && <CustomGamePage />}
        {states.currentPage === "GameTournament" && <GameTournament />}
        {states.currentPage === "GameOneVsAll" && <GameOneVsAll />}
        {states.currentPage === "GameFreeForAll" && <GameFreeForAll />}
        {states.currentPage === "WinnerPage" && <WinnerPage />}
      </>
    </statesContext.Provider>
  );
}

createRoot(document.getElementById("root")).render(<App />);
