import { useContext, useState, useEffect, useRef } from "react";
import {
  getRandomIndex,
  formatTime,
  removeItemFromState,
  changeState,
  getVideoId,
  getVideoTitle,
} from "./utilityFuncs.js";
import { statesContext } from "./main.jsx";
import {
  fetchPlaylist,
  fetchPlaylists,
  removeItemFromDatabase,
  addItemToDatabase,
  addPlaylistToDatabase,
} from "./database.js";

const list = [
  {
    title:
      "Bear McCreary - A Son's Path | God of War Ragnarök (Original Soundtrack)",
    videoId: "7peuZ4vaPdw",
  },
  {
    title: "The City Must Survive",
    videoId: "oVZ9nRAFR8s",
  },
  {
    title:
      "Clair Obscu: Expedition 33 -  Une vie à peindre (Original Soundtrack)",
    videoId: "MLd3E6_f5Rg",
  },
  {
    title: 'Helldivers 2 Main Theme - "A Cup Of Liber-Tea"',
    videoId: "R5hCkh2AH58",
  },
  {
    title: "猛き者たちよ",
    videoId: "FqlLD7COCw4",
  },
  {
    title: "Subhuman - Dante's battle theme from Devil May Cry 5 OST (HD)",
    videoId: "jozqnG_32i0",
  },
  {
    title: "Color Your Night",
    videoId: "j9Sn1nFGQQ8",
  },
  {
    title: "Don't",
    videoId: "dT5Ck6bXBu8",
  },
  {
    title: "OMNIS LACRIMA",
    videoId: "jrhUsgR5S4s",
  },
  {
    title: "Super Mario Odyssey - Jump Up, Super Star!",
    videoId: "e9r5hx47kxM",
  },
  {
    title: "Into Asgard",
    videoId: "IbWpQZsFIik",
  },
  {
    title:
      "Rell, The Iron Maiden | Champion Theme (ft. Ecca Vandal) - League of Legends",
    videoId: "ETaX9DZBSEk",
  },
  {
    title: "Last Surprise",
    videoId: "ZNGqBDRJgvo",
  },
  {
    title: "A New Dawn (Original Game Soundtrack)",
    videoId: "I-p3x84aqak",
  },
  {
    title: "Halo",
    videoId: "DOZLSho2o-M",
  },
  {
    title: "Alba the Adventurous",
    videoId: "s0y9OMuKfbU",
  },
  {
    title:
      "Fiddlesticks, The Ancient Fear | Champion Theme - League of Legends",
    videoId: "tq9bB6QPAdA",
  },
  {
    title: "Go Tell Aunt Rhody (RE7 Official Soundtrack Full Version)",
    videoId: "QzCyF0lrioc",
  },
  {
    title: "The Way of the Ghost",
    videoId: "KoOpFGuq2Kk",
  },
  {
    title: "OCTOPATH TRAVELER - メインテーマ -",
    videoId: "sR1OHW_IReI",
  },
  {
    title: "Smell of the Game",
    videoId: "ikQHkhL8YMM",
  },
  {
    title: "Sonic Frontiers OST - I’m Here (Supreme)",
    videoId: "wcfPFLiS28s",
  },
  {
    title: "Theme of Bayonetta - Mysterious Destiny - Angel Attack",
    videoId: "6bkY9ZS-9BA",
  },
  {
    title: "Divinity - Original Sin 2 (Main Theme)",
    videoId: "UkgVL05NsWo",
  },
  {
    title: "Gerudo Valley - The Legend of Zeld: Ocarina of Time",
    videoId: "Mo-9CYItL3s",
  },
  {
    title: "Dragon's Dogma Dark Arisen - Coils Of Light [English Version]",
    videoId: "UcoLNTG1tTo",
  },
  {
    title:
      "Chris Christodoulou -  …con lentitud poderosa | Risk of Rain 2 (2020)",
    videoId: "Nn9trJXUrp0",
  },
  {
    title: "Sifu - 31. Martial Mastery (Game Version)",
    videoId: "aX93hgqcy9k",
  },
  {
    title: "New York's Only Spider-Man | Marvel's Spider-Ma: Miles Morales OST",
    videoId: "5_Vthdkfzmk",
  },
  {
    title: "Snake Eater",
    videoId: "m2OR_JaXDaM",
  },
  {
    title: "I Am... All Of Me",
    videoId: "NucG0kD3pkg",
  },
  {
    title:
      'Assassin\'s Creed Valhalla Official Soundtrack | "Out of the North" By Jesper Kyd',
    videoId: "qr6DxeGSfR8",
  },
  {
    title: "パスカル",
    videoId: "YA9ozz04Nfk",
  },
  {
    title: "Travelers",
    videoId: "z34enKCqRGk",
  },
  {
    title: "Stardew Valley OST - Cloud Country",
    videoId: "Tk6tA6OVqvk",
  },
  {
    title: "Gun Goddess Miss Fortune | Login Screen - League of Legends",
    videoId: "O4ARTL54N2U",
  },
  {
    title: "Monster Hunter Original Soundtrack — Proof of a Hero (Main Theme.)",
    videoId: "p1fEV6QbCww",
  },
  {
    title: "A Dance in Fire",
    videoId: "Y69mDJxFsRA",
  },
  {
    title: "It's Going Down Now",
    videoId: "2KuWjZD6PBA",
  },
  {
    title: "Answers",
    videoId: "p86icWXs0CQ",
  },
  {
    title: "PSO2 Battleship Yamato Part 2 Music: Steel Prestige (A.I.S)",
    videoId: "r2jXrdLygxw",
  },
  {
    title: "遺サレタ場所/斜光",
    videoId: "hMw-DUnR10s",
  },
  {
    title: "Camille, the Steel Shadow | Login Screen - League of Legends",
    videoId: "0GJNJ2fsFno",
  },
  {
    title: "Assassin's Creed 2 OST / Jesper Kyd - Ezio's Family (Track 03)",
    videoId: "FSVHx23ByhM",
  },
  {
    title:
      "Disk 02-02 Forest Night Fever - Vampire Survivors Original Soundtrack",
    videoId: "dxx6fvhf5Pc",
  },
  {
    title: "Sonic Heroes",
    videoId: "3F1bHQEtOyM",
  },
  {
    title: "Dragon Road (Day) - Sonic Unleashed [OST]",
    videoId: "E7ldFrIdHZU",
  },
  {
    title: "Heaven",
    videoId: "0d9Oqm0Dt60",
  },
  {
    title: "We Shall Sail Together (Original Game Soundtrack)",
    videoId: "vzR-mvlf15g",
  },
  {
    title:
      "Ilan Eshkeri - Sacrifice of Tradition | Ghost of Tsushima (Music from the Video Game)",
    videoId: "cU6PxPLrhuc",
  },
  {
    title: "The Way of the Samurai",
    videoId: "oRUvfEIuQrA",
  },
  {
    title: "Enemy Territory [Westopolis Remix] - Sonic Forces [OST]",
    videoId: "y2Pay-MYsFw",
  },
  {
    title:
      "Time to Fight! (Bionis' Shoulder) - Xenoblade Chronicle: Future Connected OST [05]",
    videoId: "gdqGq0rZ5LU",
  },
  {
    title:
      "Assassin's Creed Odysse: Legend of the Eagle Bearer (Main Theme) | The Flight",
    videoId: "eA0nbtxfeq4",
  },
  {
    title: "Darkness",
    videoId: "ysUhh-JQZRw",
  },
  {
    title: "Noisia - Devil May Cry Soundtrack - 28 - Kat's Theme (Bonus)",
    videoId: "sZHc3zpncMk",
  },
  {
    title: "Baking the Wondertart",
    videoId: "6wdxamIMJ-Y",
  },
  {
    title: "Web Launch",
    videoId: "m9mrxvkPkKI",
  },
  {
    title: "Dragon's Dogma Main Theme (Eternal Return by Aubrey Ashburn) HD!!",
    videoId: "gQtVsO6jFyg",
  },
  {
    title: "Main Theme, Pt. 1",
    videoId: "h2dqAADHnzw",
  },
  {
    title: 'We All Lift Together (From "Warframe")',
    videoId: "2yIELWjG8Tc",
  },
  {
    title: "Hades - No Escape",
    videoId: "oksESAMg7WM",
  },
  {
    title: "Metal Gear Risin: Revengeance OST   It Has To Be This Way Extended",
    videoId: "ZYAPgPH9hsI",
  },
  {
    title: "Nate's Theme 3.0",
    videoId: "58ErHOchN8M",
  },
  {
    title: "24. Twisted Tango (bonus) - Vampyr OST",
    videoId: "iLUO_cS3xl8",
  },
  {
    title:
      "Gustavo Santaolalla - The Path (A New Beginning) | The Last of Us (Video Game Soundtrack)",
    videoId: "vC4CfQJLhuk",
  },
  {
    title: "Final Fantasy XI: A Realm Reborn OST - Prelude ~ Rebirth",
    videoId: "-hb-TgZlhI0",
  },
  {
    title: "Swirls of the Stream",
    videoId: "gjWRmoFIjjw",
  },
  {
    title:
      "[Zenless Zone Zero OST] Meow~ (Nekomata Mana Agent Story Stage Theme)",
    videoId: "bXTD4WvdG3M",
  },
  {
    title: "The Blood Harbor Ripper",
    videoId: "Xa--9CJ-Uic",
  },
  {
    title: "サンレス水郷",
    videoId: "tbktye3f0oo",
  },
  {
    title: "ハンマーヘッド",
    videoId: "_bYZ34u1Piw",
  },
  {
    title: "The Town Inside Me",
    videoId: "uQTBzmBDSv0",
  },
  {
    title: "Arcana of Zipacna",
    videoId: "mhjCyv6wulA",
  },
  {
    title:
      "Gustavo Santaolalla - The Last of Us (Main Theme) | The Last of Us (Video Game Soundtrack)",
    videoId: "Pt1pOY3_W64",
  },
  {
    title: "Love Song For A Dead Man - Call Of Duty Black Ops II",
    videoId: "KH-BgU8N-Mk",
  },
  {
    title: "Devil Trigger - Nero's Battle Theme from Devil May Cry 5 OST (HD)",
    videoId: "tnAoq3_6f5M",
  },
  {
    title: "Dragonborn",
    videoId: "6fILxnBH1Tg",
  },
  {
    title: "Full Moon Full Life",
    videoId: "hWhgrA2dhrk",
  },
  {
    title:
      "Main Theme (Full Version) - The Legend of Zeld: Tears of the Kingdom OST",
    videoId: "FKLHDgbTD0k",
  },
  {
    title: "Crash Bandicoot Main Theme",
    videoId: "QzG5QWcKTSc",
  },
  {
    title: "Main Theme - Super Smash Bro: Brawl",
    videoId: "zeKE0NHUtUw",
  },
  {
    title: "FFVII REMAK: J-E-N-O-V-A ー胎動ー",
    videoId: "2zvHLGPpkO0",
  },
  {
    title: "Signs Of Love",
    videoId: "tTu-Uhlu4RU",
  },
  {
    title: "Twilight Party Cruise (Climax)",
    videoId: "eUUPlsi2gE8",
  },
  {
    title: "Arkham City Main Theme",
    videoId: "Ll9H9o8FJr0",
  },
  {
    title: "Hopes And Dreams",
    videoId: "HA3Ks8NLS-Y",
  },
  {
    title: "See You At The Top (Short Hike)",
    videoId: "O6OjhgzThM8",
  },
  {
    title: "KEYGEN CHURCH - Tenebre Rosso Sangue (ULTRAKILL Soundtrack)",
    videoId: "L5q4uYj-gyg",
  },
  {
    title:
      "The Legend of Zeld: Breath of the Wild OST - Final Boss/Dark Beast Ganon Theme (FULL)",
    videoId: "gaaLWh-5Esc",
  },
  {
    title: "Castlevania Order of Ecclesia - An Empty Tome",
    videoId: "pyXRV7wkeyo",
  },
  {
    title: "Heavy Heads Intro",
    videoId: "At23wicSNTQ",
  },
  {
    title: "Dry Reef Theme",
    videoId: "-BPpop6Hbbs",
  },
  {
    title: "Encounter! Rival Brendan (Pokémon Omega Ruby & Alpha Sapphire OST)",
    videoId: "u72DI1aj8GU",
  },
  {
    title: "Live & Learn",
    videoId: "My-WSM-6QlE",
  },
  {
    title: "FFVII REMAK: 片翼の天使 ー再生ー",
    videoId: "kR8rk3K6qzo",
  },
  {
    title: "26 Mad Forest | Vampire Survivor: Ode to Castlevania",
    videoId: "t3WYvSQiaGE",
  },
  {
    title: "Symphony of Boreal Wind",
    videoId: "QFSunKPD-Zc",
  },
  {
    title:
      "Doom Eternal OST - The Only Thing They Fear Is You (Mick Gordon) [Doom Eternal Theme]",
    videoId: "kpnW68Q8ltc",
  },
  {
    title:
      "The Legend Of Monkey Island (Main Theme) - Sea Of Thieves Soundtrack",
    videoId: "vAc1ux_kCYA",
  },
  {
    title: "Gwyn, Lord of Cinder - Dark Souls Soundtrack 28",
    videoId: "Nvv9w-UPuSY",
  },
  {
    title: "Metroid Dread OS: The Theme of Samus Aran",
    videoId: "Fo5JOpXnk5M",
  },
  {
    title:
      "A Hat in Time OST - 66 Scootin' Through Clocktowers Beneath The Sea",
    videoId: "CbmjqyB41vI",
  },
  {
    title: "GTA V - Welcome to Los Santos Soundtrack - Intro/Theme song",
    videoId: "KzKvPrIPVbE",
  },
  {
    title: "Bloodstained Ritual of the Night OST Voyage of Promise",
    videoId: "yB6gspLVQKQ",
  },
  {
    title: "Yakuza 0 OST - 38 Pledge of Demon 怨魔の契り",
    videoId: "ApreCAQiZ4w",
  },
  {
    title: "I'm There Too",
    videoId: "peNtwtLEg_g",
  },
  {
    title:
      "THAT Sleeping Dogs theme music on loop (Dance of The Yi People remix)",
    videoId: "7iH8Qc9-gA8",
  },
  {
    title: "Crash Twinsanity Soundtrack - Iceberg Lab",
    videoId: "yKJHYgZyGb8",
  },
  {
    title: "Between The Fog",
    videoId: "YFHAYq40Z5I",
  },
  {
    title: "The Atomic Era (Ottoman)",
    videoId: "XgmILA3y22s",
  },
  {
    title:
      "Chase Down the Truth (Arranged) ~ Ace Attorney Investigations Collection OST",
    videoId: "SIoIKhCBq_I",
  },
  {
    title: "Mirror's Edge Theme Song HQ",
    videoId: "YP3M9_gICsc",
  },
  {
    title: "[Official] Celeste Original Soundtrack - 03 - Resurrections",
    videoId: "1rwAvUvvQzQ",
  },
  {
    title: "The Legend of Zeld: Breath of the Wild - Theme (SoundTrack)",
    videoId: "cPWBG6_jn4Y",
  },
  {
    title: "CLANNAD - The palm of a tiny hand",
    videoId: "i67ZXLPeg9s",
  },
  {
    title:
      "Chris Christodoulou - You're Gonna Need a Bigger Ukulele | Risk of Rain 2 (2020)",
    videoId: "r2JeL1ibBI0",
  },
  {
    title: "Rules of Nature",
    videoId: "jOpzP33_USs",
  },
  {
    title: "Street Fighter 5 - Ryu's Theme (SFV OST)",
    videoId: "oUn549UmSlw",
  },
  {
    title: "Maiden Voyage (Original Game Soundtrack)",
    videoId: "rvLs-9SA9i0",
  },
  {
    title: "Bayonetta - Fly Me To The Moon (Climax)",
    videoId: "EV6E13xODyA",
  },
  {
    title: "誰がために・改",
    videoId: "aTuE4BROrjA",
  },
  {
    title: "Devil May Cry 5 OST - Any Special Orders? (Nico's Shop)",
    videoId: "27qPvCq42lY",
  },
  {
    title: "Cult of the Lamb [Official] - Nudism",
    videoId: "f0SxVJ9Wpxw",
  },
  {
    title: "Horizon Zero Dawn OST - Aloy's Theme",
    videoId: "_w9B7uwLZeI",
  },
  {
    title: '"Endwalker – Footfalls" with Official Lyrics | Final Fantasy XIV',
    videoId: "pmP-1zELQZg",
  },
  {
    title: "Elden Ring",
    videoId: "KBP1zYwBzOE",
  },
  {
    title: "A Hat in Time OST [Seal the Deal] - Peace and Tranquility",
    videoId: "SHvhps47Lmc",
  },
  {
    title: "Enter the Gungeon - Enter the Gungeon - OST",
    videoId: "xZzWiFjsbM0",
  },
  {
    title: "Grzegorz Mazur - The Last Goodbye",
    videoId: "DEVoC-LJIhc",
  },
  {
    title: "Moonlight Canyon - Kirby and the Forgotten Land OST [055]",
    videoId: "CqigaFzqhys",
  },
  {
    title:
      "Disk 02-06 I'm Every Reaper - Vampire Survivors Original Soundtrack",
    videoId: "4OksbeQdXRo",
  },
  {
    title: "Together Till Infinity",
    videoId: "l2otQZ70SUA",
  },
  {
    title: "Techno Syndrome (Mortal Kombat)",
    videoId: "Sr1bLLvsbh0",
  },
  {
    title: "Mischievous Alchemy",
    videoId: "PizL44RpB0s",
  },
  {
    title: "Bayonetta 2 - Battle OST 1 - Moon River ( Climax Mix )",
    videoId: "sXhhdNL05sY",
  },
  {
    title: "Harvest Moon Back to Nature Main Theme Song",
    videoId: "BLJ_o7urUVc",
  },
  {
    title: "Every Day Is Night",
    videoId: "H-AfGh8gmiQ",
  },
  {
    title: "Apex Legend: Main Theme",
    videoId: "Xq0joZ24D9Y",
  },
  {
    title: "Secunda",
    videoId: "iqkQRgGdAPo",
  },
  {
    title: "Bully - Soundtrack Main Theme",
    videoId: "7RU7CohvsMU",
  },
  {
    title: "Can You Feel the Sunshine - Sonic R [OST]",
    videoId: "dgJWZiBt6_w",
  },
  {
    title: "Dragon Ball Z Budokai 3 - Opening Cinematic Remastered (4k)",
    videoId: "4_-eEf91hwo",
  },
  {
    title:
      "Braum, the Heart of the Freljord | Login Screen - League of Legends",
    videoId: "F8cPDpXnQa0",
  },
  {
    title: "Sonic Mania OST - Studiopolis Act 1",
    videoId: "NIWyZmFSep0",
  },
  {
    title: "Regicide",
    videoId: "0F9Nvxyt9t8",
  },
  {
    title:
      "Bloodborne Soundtrack OST - Ludwig, The Accursed & Holy Blade (The Old Hunters)",
    videoId: "ALbVEmzY5S4",
  },
  {
    title: "Stickerbrush Symphony - Super Smash Bros. Brawl",
    videoId: "gJkVwt_JJXo",
  },
  {
    title: "Left Behind",
    videoId: "6s8wrKBLe14",
  },
  {
    title: "Animal Crossing New Horizons  - Main Theme Song",
    videoId: "lI_C1Bjdqn4",
  },
  {
    title:
      "Kingdom Hearts Simple and Clean by Utada Hikaru 720p HD Audio Boost Remix w/Lyrics in Description",
    videoId: "UigzN-4JR14",
  },
  {
    title: "Final Fantasy 13 OST Blinded By Light ( Main Battle Theme )",
    videoId: "RPtq1Bpf6q4",
  },
  {
    title: "Combichrist - Never Surrender [HQ] [Devil May Cry Soundtrack]",
    videoId: "_9J8ccza1OI",
  },
  {
    title:
      "League of Legends - Light and Shadow (Hiroyuki Sawano feat. Gemie) | Official music",
    videoId: "cmzVnvl3xQg",
  },
  {
    title: "The Struggle",
    videoId: "sQffJpzreoE",
  },
  {
    title: "「Azura's Dance」 (Nohr Jap. Ver.) Extended 【Fire Emblem Fates】",
    videoId: "Hh4L4RijCsw",
  },
  {
    title: "Transistor Original Soundtrack - The Spine",
    videoId: "41tIUr_ex3g",
  },
  {
    title: "Mick Gordon - 11. BFG Division",
    videoId: "QHRuTYtSbJQ",
  },
  {
    title: "1. God of War | God of War OST",
    videoId: "y9hh91-2iaA",
  },
  {
    title: "BLACK OPS 2 ZOMBIE: OFFICIAL Theme Song",
    videoId: "bPj_SmRW4lM",
  },
  {
    title:
      "【Haloweak】NARWHAL 「Punishin: Gray Raven OST - 极地暗流」 【パニシン:グレイレイヴン】Official",
    videoId: "q2DBeby7ni8",
  },
  {
    title:
      "Crimson Cloud - V's Battle Theme from Devil May Cry 5 (Extended HD Version)",
    videoId: "mDdQBxbdj6k",
  },
  {
    title:
      "Bury the Light - Vergil's battle theme from Devil May Cry 5 Special Edition",
    videoId: "Jrg9KxGNeJY",
  },
  {
    title: "A Hat in Time OST - Main Theme",
    videoId: "LijvcUx2LNg",
  },
  {
    title: "Terraria Music - Ocean",
    videoId: "fdi06Y6oFDo",
  },
  {
    title: "Grand Theft Auto IV Theme Song *[best quality]*",
    videoId: "pWO718iy5mY",
  },
  {
    title: "David Orr- Four Brave Champions (Castle Crashers Main Theme)",
    videoId: "gGJenum-clc",
  },
  {
    title:
      "Assassin's Creed IV Black Flag - Assassin's Creed IV Black Flag Main Theme (Track 01)",
    videoId: "UNREuwdJCw0",
  },
  {
    title: "Konga Conga Kappa",
    videoId: "Eon9jJDK2q8",
  },
  {
    title: "Promise",
    videoId: "7M_2aAIebwo",
  },
  {
    title: "Crash of Worlds",
    videoId: "mBMKuEfQrV4",
  },
  {
    title: "Diablo 2 - Tristram (HQ)",
    videoId: "XheJnmLAwhk",
  },
  {
    title: "Portal - 'Still Alive'",
    videoId: "Y6ljFaKRTrI",
  },
  {
    title: "Shanta: Half-Genie Hero OST - Hypno Baron's Castle",
    videoId: "ovMtEj2u8ck",
  },
  {
    title:
      "Paradise Planning Outdoors (Day) - Animal Crossin: New Horizons – Happy Home Paradise",
    videoId: "obNox8vKuBY",
  },
  {
    title: "Everybody Falls (Fall Guys Theme)",
    videoId: "ys4rkcMbtjY",
  },
  {
    title: "Alan Wake Soundtrac: 01 - Petri Alanko - A Writer's Dream",
    videoId: "b7Ef2ik_b2A",
  },
  {
    title: "Dracula Castle",
    videoId: "cyWTgLf-piE",
  },
  {
    title: "Friday Night",
    videoId: "SaNmV7Sx5_M",
  },
  {
    title: "To the Edge",
    videoId: "6IiG4vo9k9U",
  },
  {
    title: "I Think You Should Do As He Says",
    videoId: "wTaAS0jxQu0",
  },
  {
    title: "Total Annihilation",
    videoId: "Ynq429R03dE",
  },
  {
    title: "[Zenless Zone Zero OST] Golden Sign (S-Rank Gacha Theme Vocal Mix)",
    videoId: "E0Pv54o_BKs",
  },
  {
    title: "Donkey Kong Country Theme Restored to HD",
    videoId: "Xqf8jID9TsE",
  },
  {
    title:
      "Leave Her Johnny (Sea Shanty with lyrics) | Assassin's Creed : Black Flag (OST)",
    videoId: "nCtn6igpgP4",
  },
  {
    title: "Honor for All - End Credits",
    videoId: "l7hsVkYh9Ts",
  },
  {
    title:
      "Ekko, the Boy Who Shattered Time | Login Screen - League of Legends",
    videoId: "8_OSWJeVTg0",
  },
  {
    title: 'Battlefield 4 "Warsaw" Theme',
    videoId: "wp1o1FIt7bs",
  },
  {
    title: "Jhin, the Virtuoso | Login Screen - League of Legends",
    videoId: "NSQZqVsaKWY",
  },
  {
    title: "V",
    videoId: "JYC8aINHFxc",
  },
  {
    title: "... Steel For Humans",
    videoId: "uqp4Jc-XkCw",
  },
  {
    title: "Mystery Man",
    videoId: "DhXhCz1dKAQ",
  },
  {
    title: "Pizza Tower OST - Leaning Dream (Pause Screen)",
    videoId: "oKDYjjvcjjA",
  },
  {
    title:
      "The Toxic Avenger - Make this Right (from Furi original soundtrack)",
    videoId: "1CGMk_roNaE",
  },
  {
    title: "Salutations",
    videoId: "pQsQKtxG9D0",
  },
  {
    title: "Horizon",
    videoId: "cuN82OBSD9s",
  },
  {
    title: "Crash Twinsanity Soundtrack - N. Sanity Island",
    videoId: "PzbnWihnBK4",
  },
  {
    title: "Pineapple on pizza OST - The floor is lava",
    videoId: "tJa8_9t--A0",
  },
  {
    title:
      "Ludvig Forssell - BB's Theme (from Death Stranding) (Official Audio)",
    videoId: "Ghk1RFr51xo",
  },
  {
    title: "The Light of Hope",
    videoId: "NIvNCDl1a8s",
  },
  {
    title: "Settling the Score",
    videoId: "cc8Y9tkmXGU",
  },
  {
    title: "Kenshi Theme - Soundtrack Version",
    videoId: "vAe3URPdJrw",
  },
  {
    title:
      "Hopeless Call (Jazz Arrangement) - Soul Hackers 25th Anniversary Music Album",
    videoId: "zjIVnDveefA",
  },
  {
    title:
      "[Zenless Zone Zero OST] Endless Construction Day - Day (Lemnian Hollow Stage)",
    videoId: "Sdd2iQz24po",
  },
  {
    title: "Hollow Knight OST - Sealed Vessel",
    videoId: "ze0Rk-m0w2A",
  },
  {
    title: "Doki Doki Literature Club! OST - Your Reality (Credits)",
    videoId: "CAL4WMpBNs0",
  },
  {
    title: "Shantae and the Pirate's Curse OS: We Love Burning Town",
    videoId: "fFDhn4wgwKk",
  },
  {
    title: "You Are The Jumpmaster",
    videoId: "UrAhnndvrSU",
  },
  {
    title: "Rage of Sparta",
    videoId: "9a4Rx7T_lwc",
  },
  {
    title: "Loonboon",
    videoId: "lr4vi_XAjQQ",
  },
  {
    title: "Last One Standing",
    videoId: "1r9FA1GONCo",
  },
  {
    title: "[High Quality] Shadow of the Colossus OST 13 - Revived Power",
    videoId: "iUjkBRKg2q0",
  },
  {
    title: "The Trial of the Goddess",
    videoId: "AejNS64BIlE",
  },
  {
    title: "You Shall Never Have to Forgive Me Again",
    videoId: "Ue3s-hNNFvo",
  },
  {
    title: "Fallout 4 Main Theme",
    videoId: "_yGpoRbwe4s",
  },
  {
    title: "GTA San Andreas Theme Song Full ! !",
    videoId: "W4VTq0sa9yg",
  },
  {
    title: "Street Fighter 5 - Ken's Theme (SFV OST)",
    videoId: "1t8B3Sx8X-0",
  },
  {
    title: "Funky Dealer",
    videoId: "CwE2k0HMDfo",
  },
  {
    title: "Crazy Dave (Intro Theme)",
    videoId: "V9QV9PFVCs8",
  },
  {
    title: "Quiet's Theme",
    videoId: "wQWC14HCKYI",
  },
  {
    title: "Petalburg City (Pokémon Omega Ruby & Alpha Sapphire OST)",
    videoId: "scKwQa7bCR0",
  },
  {
    title: "Castlevania Rondo of Blood Music - Bloodlines",
    videoId: "XoGCokTDSyA",
  },
  {
    title: "Mega Man X OST - Central Highway (Opening Stage)",
    videoId: "8F2jf0NRl2Y",
  },
  {
    title: "Shadow World",
    videoId: "5qyvePW7Wh4",
  },
  {
    title: "Creator",
    videoId: "Qtf8YFw8iZg",
  },
  {
    title: "High-Noon Hoopla",
    videoId: "w3ReqY8-QQU",
  },
  {
    title: "Illusions of Power | Darksiders III OST",
    videoId: "7ppnVLHCeiU",
  },
  {
    title: "BLACK OPS 2 - OFFICIAL MULTIPLAYER MENU THEME SONG (HD)",
    videoId: "sIWnz0x_pSQ",
  },
  {
    title: "Beacon Beach",
    videoId: "DiqpRhfRfOo",
  },
  {
    title:
      "Monster Hunter World OS: Astera Theme 新大陸への礎(いしずえ)～調査拠点アステラ [HQ | 4K]",
    videoId: "88G-FndKZNk",
  },
  {
    title: "Silenty Boisterous (Normal)",
    videoId: "D-EfmNm7XLo",
  },
  {
    title: "Starbound OST - Novakid Theme- I was the Sun (Before it was Cool)",
    videoId: "WR7fwMM5ccc",
  },
  {
    title: "Danger - :24 (from Furi original soundtrack)",
    videoId: "8QpUGCXwOks",
  },
  {
    title: "Into the Unknown",
    videoId: "tEzYsaLm7nw",
  },
  {
    title: "Hotline Miami Soundtrack ~ Hydrogen",
    videoId: "84q83skr_tk",
  },
  {
    title: "Hotline Miami : Wrong Number Soundtrack - Divide",
    videoId: "JflsBihO_MQ",
  },
  {
    title:
      "Naruto Shippude: Ultimate Ninja Storm 2- The Calm Before the Storm (Menu/Character Select Music)",
    videoId: "WkZnRNbrBTI",
  },
  {
    title: "We're The Desperate Measures (ODST Theme)",
    videoId: "-WWjwsCCOFM",
  },
  {
    title: "Inkwell Hell",
    videoId: "l_wxCbTd5zY",
  },
  {
    title: "Honolulu City Lights【Full Spec Edition】",
    videoId: "3oIwDvi_LP8",
  },
  {
    title: "Tekken 3 - Jin Kazama Theme Song",
    videoId: "QnfgNHK_VxY",
  },
  {
    title: "DANGANRONPA",
    videoId: "DSdjacXO9yE",
  },
  {
    title: "Prisoner's Awakening",
    videoId: "QRk4uC_o7eQ",
  },
  {
    title: 'Everything\'s Alright (From "To the Moon")',
    videoId: "nIZxh_nc64w",
  },
  {
    title: "Top Gea: Vegas",
    videoId: "gvOQi7U6IZQ",
  },
  {
    title: "Exodus (feat. Alexey Omelchuk)",
    videoId: "cwDazCRTup0",
  },
  {
    title: "Sneaky Driver",
    videoId: "CnJsQQWrmiM",
  },
  {
    title:
      "Portal 2 : End Credits Song 'Want You Gone' by Jonathan Coulton [1080p HD]",
    videoId: "dVVZaZ8yO6o",
  },
];

export function component({}) {
  return <></>;
}

export function Button({ name, func,  extra }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (isButtonDisabled) {
      const timer = setTimeout(() => {
        setIsButtonDisabled(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isButtonDisabled]);

  const handleClick = async () => {
    setIsButtonDisabled(true);
    console.log('pressed');
    if (typeof func === "function") {
      await func();
    }
  };

  return (
    <button
      className={`relative bg-cover bg-center  bg-no-repeat px-8 py-4 bg-main  text-lg border-b-4 border-l-4 border-green-900 shadow-inner active:border-t-4 active:border-r-4 active:border-green-900 active:border-gray-200 active:translate-y-[2px] ${
        isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
      } ${extra || ""}`}
      onClick={handleClick}
      disabled={isButtonDisabled}
    >
      {name}
    </button>
  );
}

//game
export function Round({ stateChange, maxRound }) {
  const [round, setRound] = useState(0);
  const initialMaxRound = useRef(maxRound);

  useEffect(() => {
    setRound((prevRound) => prevRound + 1);
  }, [stateChange]);

  return (
    <div className="text-5xl ">
      Round <span className="text-main text-5xl">{round}</span>
      <span className="text-white text-opacity-50 text-4xl">
        of {initialMaxRound.current}
      </span>
    </div>
  );
}

export function Timer({ seconds, videoIdsToRemove, funcToVote }) {
  const [states, setStates] = useContext(statesContext);
  const [timeLeft, setTimeLeft] = useState(seconds);

  
    let removeRandomVideo = () => {
      const IdToRemove = getRandomIndex(-1, videoIdsToRemove);
      console.log(IdToRemove);
      funcToVote(IdToRemove);
    }
 

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds, videoIdsToRemove]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (states.gameMode === "GameTournament") {
        removeRandomVideo();
        return;
      } else {
        funcToVote();
        return;
      }
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  return (
    <div>
      <h1 className="text-3xl  m-4">{formatTime(timeLeft)}</h1>
    </div>
  );
}

//video
export function VideoCard({ videoId, videoTitle, vote }) {
  return (
    <div className="  space-y-5 flex flex-col items-center justify-center h-[60vh] w-[40vw] m-4 ">
      <YoutubeFrame videoTitle={videoTitle} videoId={videoId} />
      <Button name="vote" func={vote} extra={"w-full"} />
    </div>
  );
}

export function YoutubeFrame({ videoTitle, videoId }) {
  return (
    <div className="flex flex-col w-full h-full border-4 border-main bg-white">
      {/* Title Bar */}
      <div className="flex justify-between items-center bg-white px-2 py-1 border-b-4 border-green-500">
        <VideoTitle videoTitle={videoTitle} />
        <div className="flex items-center">
          <span className="text-3xl text-black mx-1 font-mono">-</span>
          <span className="text-3xl text-black mx-1 font-mono">□</span>
          <span className="text-3xl text-red-500 mx-1 font-mono font-extrabold">
            ×
          </span>
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-black border-b-4 border-green-500 w-full h-full ">
        <Video videoId={videoId} />
      </div>
    </div>
  );
}

export function Video({ videoId }) {
  return (
    <iframe
      className="w-full h-full"
      src={`https://www.youtube.com/embed/${videoId}`}
    />
  );
}

export function VideoTitle({ videoTitle }) {
  return (
    <div className="w-[90%] text-main  overflow-hidden text-ellipsis whitespace-nowrap ">
      <a className="text-xs">{videoTitle}</a>
    </div>
  );
}

//playlist
export function AddVideo({}) {
  const [states, setStates] = useContext(statesContext);
  const [inputValue, setInputValue] = useState("");

  const handleClick = async (playlistId, video) => {
    const videoId = getVideoId(video);

    try {
      const title = await getVideoTitle(videoId);

      setInputValue("");
      addItemToDatabase(playlistId, { title: title, videoId: videoId });

      const res = await fetchPlaylist(playlistId);
      changeState(setStates, { databasePlayList: res.playList.videos });
    } catch (error) {
      console.error("Error handling click:", error);
    }
  };

  return (
    <div className=" w-[100%] flex items-center justify-center m-4">
      <input
        className="text-main p-4 w-[100%] rounded-sm"
        type="text"
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        placeholder="Add youtube link "
        value={inputValue}
      />
      <Button
        name="add"
        func={() => handleClick(states.databasePlayListId, inputValue)}
        extra={"p-2 "}
      />
    </div>
  );
}

export function VideoPlaylist({ video, videoKey }) {
  const [states, setStates] = useContext(statesContext);

  function removeVideo(videoId) {
    removeItemFromDatabase(states.databasePlayListId, videoId);
    fetchPlaylist(states.databasePlayListId).then((res) => {
      changeState(setStates, { databasePlayList: res.playList.videos });
    });
    console.log("video removed" + videoId);
  }

  return (
    <div className="flex justify-between m-3">
      <div
        className="w-[80%] overflow-hidden  text-ellipsis whitespace-nowrap"
        key={videoKey}
      >
        <a
          href={"https://www.youtube.com/watch?v=" + video.videoId}
          target="_blank"
          rel="noopener noreferrer"
        >
          {video.title}
        </a>
      </div>
      <Button
        name="remove"
        func={() => removeVideo(videoKey)}
        extra={"text-xs p-2"}
      />
    </div>
  );
}

export function PlaylistInfo({}) {
  const [states, setStates] = useContext(statesContext);
  return (
    <div className="text-main">
      {states.databasePlayListName} -{" "}
      {states.databasePlayList
        ? Object.values(states.databasePlayList).length
        : 0}{" "}
      videos
    </div>
  );
}

export function Playlist({}) {
  const [states, setStates] = useContext(statesContext);

  //     Object.entries(states.databasePlayList)    Object.entries(list)
  return (
    <div>
      <div className="flex flex-col w-full border-4 border-main bg-white mt-4">
        {/* Title Bar */}
        <div className="flex justify-between items-center bg-white px-2 py-1 border-b-4 border-green-500">
          <PlaylistInfo />
          <div className="flex items-center">
            <span className="text-3xl text-black mx-1 font-mono">-</span>
            <span className="text-3xl text-black mx-1 font-mono">□</span>
            <span className="text-3xl text-red-500 mx-1 font-mono font-extrabold">
              ×
            </span>
          </div>
        </div>

        {/* Video Section */}
        <div className="bg-black border-b-4 border-green-500 h-[70vh]   w-[80vw] flex flex-col  ">
          <div className="flex justify-center  ">
            <AddVideo />
          </div>

          <div className=" h-[70vh]  p-4 overflow-auto  ">
            {states.databasePlayList ? (
              Object.entries(states.databasePlayList)
                .reverse()
                .map(([key, video], index) => (
                  <VideoPlaylist key={index} video={video} videoKey={key} />
                ))
            ) : (
              <p>No videos available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

//playlistS
export function PlaylistsFrame({ playLists, func }) {
  return (
    <div>
      <div className="flex flex-col w-full border-4 border-main bg-white mt-4">
        {/* Title Bar */}
        <div className="flex justify-between items-center bg-white px-2 py-1 border-b-4 border-green-500">
          <span className="text-main  pl-6 text-xl">Select playlists</span>
          <div className="flex items-center">
            <span className="text-5xl text-black mx-1 font-mono">-</span>
            <span className="text-5xl text-black mx-1 font-mono">□</span>
            <span className="text-5xl text-red-500 mx-1 font-mono font-extrabold">
              ×
            </span>
          </div>
        </div>

        {/* Video Section */}
        <div className="bg-black border-b-4 border-green-500 h-[70vh]   w-[80vw] flex flex-col p-4 ">
          <div className="flex justify-center ">
            <AddPlaylist />
          </div>

          <div className=" h-[70vh]  p-4 overflow-auto flex flex-col items-center space-y-6  ">
            {playLists.map((playlist) => (
              <Button
                key={playlist[0]}
                name={playlist[1].name}
                func={() =>
                  func(playlist[1].videos, playlist[1].name, playlist[0])
                }
                extra={"w-[80%] text-4xl]"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export function AddPlaylist({}) {
  const [states, setStates] = useContext(statesContext);
  const [inputValue, setInputValue] = useState("");

  const handleClick = async (playlistName) => {
    try {
      setInputValue("");

      addPlaylistToDatabase({ name: playlistName, videos: "" });

      const res = await fetchPlaylists();
      location.reload();
    } catch (error) {
      console.error("Error handling click:", error);
    }
  };

  return (
    <div className=" w-[100%] flex items-center justify-center m-4">
      <input
        className="text-main p-4 w-[100%] rounded-sm "
        type="text"
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        placeholder="Name of the new playlist "
        value={inputValue}
      />
      <Button name="add" func={() => handleClick(inputValue)} extra={"p-2"} />
    </div>
  );
}
