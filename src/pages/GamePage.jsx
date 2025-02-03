import { useContext, useEffect, useState } from "react";
import {
  shuffleArray,
  separateIntoPairs,
  getRandomIndex
} from "../utilityFuncs.js";
import { statesContext } from "../main.jsx";
import Round from "../Components/Round.jsx";
import Timer from "../Components/Timer.jsx";
import VideoCard from "../Components/VideoCard.jsx";
import WinnerPage from "./WinnerPage.jsx";

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
    title:
      "Time to Fight! (Bionis' Shoulder) - Xenoblade Chronicle: Future Connected OST [05]",
    videoId: "gdqGq0rZ5LU"
  },
  {
    title:
      "Assassin's Creed Odysse: Legend of the Eagle Bearer (Main Theme) | The Flight",
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
    title: "Baking the Wondertart",
    videoId: "6wdxamIMJ-Y"
  },
  {
    title: "Web Launch",
    videoId: "m9mrxvkPkKI"
  },
  {
    title: "Dragon's Dogma Main Theme (Eternal Return by Aubrey Ashburn) HD!!",
    videoId: "gQtVsO6jFyg"
  },
  {
    title: "Main Theme, Pt. 1",
    videoId: "h2dqAADHnzw"
  },
  {
    title: 'We All Lift Together (From "Warframe")',
    videoId: "2yIELWjG8Tc"
  },
  {
    title: "Hades - No Escape",
    videoId: "oksESAMg7WM"
  },
  {
    title: "Metal Gear Risin: Revengeance OST   It Has To Be This Way Extended",
    videoId: "ZYAPgPH9hsI"
  },
  {
    title: "Nate's Theme 3.0",
    videoId: "58ErHOchN8M"
  },
  {
    title: "24. Twisted Tango (bonus) - Vampyr OST",
    videoId: "iLUO_cS3xl8"
  },
  {
    title:
      "Gustavo Santaolalla - The Path (A New Beginning) | The Last of Us (Video Game Soundtrack)",
    videoId: "vC4CfQJLhuk"
  },
  {
    title: "Final Fantasy XI: A Realm Reborn OST - Prelude ~ Rebirth",
    videoId: "-hb-TgZlhI0"
  },
  {
    title: "Swirls of the Stream",
    videoId: "gjWRmoFIjjw"
  },
  {
    title:
      "[Zenless Zone Zero OST] Meow~ (Nekomata Mana Agent Story Stage Theme)",
    videoId: "bXTD4WvdG3M"
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
    title:
      "Main Theme (Full Version) - The Legend of Zeld: Tears of the Kingdom OST",
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
    title:
      "Disk 02-06 I'm Every Reaper - Vampire Survivors Original Soundtrack",
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
    title:
      "Braum, the Heart of the Freljord | Login Screen - League of Legends",
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
    title:
      "Bloodborne Soundtrack OST - Ludwig, The Accursed & Holy Blade (The Old Hunters)",
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
    title:
      "League of Legends - Light and Shadow (Hiroyuki Sawano feat. Gemie) | Official music",
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
    title:
      "Crimson Cloud - V's Battle Theme from Devil May Cry 5 (Extended HD Version)",
    videoId: "mDdQBxbdj6k"
  },
  {
    title:
      "Bury the Light - Vergil's battle theme from Devil May Cry 5 Special Edition",
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
    title:
      "Assassin's Creed IV Black Flag - Assassin's Creed IV Black Flag Main Theme (Track 01)",
    videoId: "UNREuwdJCw0"
  },
  {
    title: "Konga Conga Kappa",
    videoId: "Eon9jJDK2q8"
  }
];

export function GameTournament({}) {
  const [states, setStates] = useContext(statesContext);

  const startPlaylist = Object.values(states.databasePlayList);
  const shuffled = shuffleArray(startPlaylist);
  const sliced = shuffled.slice(0, states.playlistMaxNumber);
  const paired = separateIntoPairs(sliced);
  const finalPlaylist = paired;

  const [currentPlaylist, setCurrentPlaylist] = useState(finalPlaylist);
  const [roundWinners, setRoundWinners] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (currentPlaylist.length === 0 && roundWinners.length != 1) {
      let newPairs = separateIntoPairs(roundWinners);
      setCurrentPlaylist(newPairs);
      setRoundWinners([]);
    }
    if (currentPlaylist.length === 0 && roundWinners.length === 1) {
      setWinner(roundWinners[0]);
      setStates((prev) => ({ ...prev, winner: roundWinners[0] }));
    }
  }, [currentPlaylist]);

  function vote(videoIndex) {
    const roundWinner = currentPlaylist[0][videoIndex];
    setRoundWinners((prevNextRound) => [...prevNextRound, roundWinner]);

    setCurrentPlaylist((prevNextRound) => {
      return [...prevNextRound].slice(1);
    });
  }

  function vote(videoIndex) {
    const roundWinner = currentPlaylist[0][videoIndex];
    setRoundWinners((prevNextRound) => [...prevNextRound, roundWinner]);

    setCurrentPlaylist((prevNextRound) => {
      return [...prevNextRound].slice(1); // <-- Ensure new reference
    });
  }

  if (currentPlaylist.length >= 1) {
    return (
      <div className="flex flex-col items-center justify-center  ">
        <div className="w-full flex justify-between p-3">
          <Timer
            seconds={states.timeLimit}
            videoIdsToRemove={currentPlaylist[0]}
            funcToVote={(id) => vote(id)}
          />
        </div>
        <div className="m-4 w-full flex justify-center">
          <Round
            stateChange={currentPlaylist}
            maxRound={currentPlaylist.length}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-10 ">
          {currentPlaylist[0].map((video, index) => (
            <VideoCard
              key={video.videoId}
              videoId={video.videoId}
              videoTitle={video.title}
              vote={() => vote(index)}
            />
          ))}
        </div>
      </div>
    );
  }
  if (winner) {
 
    return <WinnerPage />;
  }
}

export function GameOneVsAll({}) {
  const [states, setStates] = useContext(statesContext);

  const startPlaylist = Object.values(states.databasePlayList);
  const shuffled = shuffleArray(startPlaylist);
  const sliced = shuffled.slice(0, states.playlistMaxNumber);
  const finalPlaylist = sliced;

  const [currentPlaylist, setCurrentPlaylist] = useState(finalPlaylist);

  function vote(videoToRemove) {
    setCurrentPlaylist((prevItens) =>
      prevItens.filter((vids) => vids !== videoToRemove)
    );
  }

  useEffect(() => {
    if (currentPlaylist.length === 1) {
      setStates((prev) => ({ ...prev, winner: currentPlaylist[0] }));
    }
  }, [currentPlaylist]);
  

  if (currentPlaylist.length > 1) {
    let index1 = 0;
    let index2 = 1;

    let videoIndex1 = currentPlaylist[index1];
    let videoIndex2 = currentPlaylist[index2];

    let videoId1 = currentPlaylist[index1].videoId;
    let videoId2 = currentPlaylist[index2].videoId;

    let videoTitle1 = currentPlaylist[index1].title;
    let videoTitle2 = currentPlaylist[index2].title;

    return (
      <div className="flex flex-col items-center justify-center  ">
        <div className="w-full flex justify-between p-3">
          <Timer
            seconds={states.timeLimit}
            videoIdsToRemove={[index1, index2]}
            funcToVote={() => vote(videoIndex2)}
          />
        </div>
        <div className="m-4 w-full flex justify-center">
          <Round
            stateChange={currentPlaylist}
            maxRound={currentPlaylist.length}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-10 ">
          <VideoCard
            videoId={videoId1}
            videoTitle={videoTitle1}
            vote={() => vote(videoIndex2)}
          />

          <VideoCard
            videoId={videoId2}
            videoTitle={videoTitle2}
            vote={() => vote(videoIndex1)}
          />
        </div>
      </div>
    );
  }

  if (currentPlaylist.length === 1) {
    return <WinnerPage />;
  }
}

export function GameFreeForAll({}) {
  const [states, setStates] = useContext(statesContext);

  
  const startPlaylist = Object.values(states.databasePlayList);
  const shuffled = shuffleArray(startPlaylist);
  const sliced = shuffled.slice(0, states.playlistMaxNumber);
  const finalPlaylist = sliced;

  const [currentPlaylist, setCurrentPlaylist] = useState(finalPlaylist);

  function vote(videoToRemove) {
    setCurrentPlaylist((prevItens) =>
      prevItens.filter((vids) => vids !== videoToRemove)
    );
  }

  useEffect(() => {
    if (currentPlaylist.length === 1) {
      setStates((prev) => ({ ...prev, winner: currentPlaylist[0] }));
    }
  }, [currentPlaylist]);

  if (currentPlaylist.length >= 2) {
    let index1 = getRandomIndex(-1, currentPlaylist);
    let index2 = getRandomIndex(index1, currentPlaylist);

    let videoIndex1 = currentPlaylist[index1];
    let videoIndex2 = currentPlaylist[index2];

    let videoId1 = currentPlaylist[index1].videoId;
    let videoId2 = currentPlaylist[index2].videoId;

    let videoTitle1 = currentPlaylist[index1].title;
    let videoTitle2 = currentPlaylist[index2].title;

    return (
      <div className="flex flex-col items-center justify-center  ">
        <div className="w-full flex justify-between p-3">
          <Timer
            seconds={states.timeLimit}
            videoIdsToRemove={[index1, index2]}
            funcToVote={() => vote(videoIndex2)}
          />
        </div>
        <div className="m-4 w-full flex justify-center">
          <Round
            stateChange={currentPlaylist}
            maxRound={currentPlaylist.length}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-10 ">
          <VideoCard
            videoId={videoId1}
            videoTitle={videoTitle1}
            vote={() => vote(videoIndex2)}
          />

          <VideoCard
            videoId={videoId2}
            videoTitle={videoTitle2}
            vote={() => vote(videoIndex1)}
          />
        </div>
      </div>
    );
  }

  if (currentPlaylist.length === 1) {
    return <WinnerPage />;
  }
}
