
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBTL8WPwcuTKlkWOCVQBSuZWfAVwZ-gJk8",
  authDomain: "alpacasbattle.firebaseapp.com",
  projectId: "alpacasbattle",
  storageBucket: "alpacasbattle.firebasestorage.app",
  messagingSenderId: "857337327051",
  appId: "1:857337327051:web:30affc0c4cdf2eccf55a4e",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function fetchPlaylist(playlist) {
  const snapshot = await get(ref(database, `/playLists/${playlist}`));
  if (snapshot.exists()) {
    const playList = snapshot.val();

    const name = playList.name;
    const videos = playList.videos;

    return { name, videos };
  }
}

async function fetchPlaylists() {
  const snapshot = await get(ref(database, `/playLists`));
  if (snapshot.exists()) {
    const playLists = snapshot.val();

    return { playLists};
  }
}





const list = [
  "7peuZ4vaPdw",
  "oVZ9nRAFR8s",
  "MLd3E6_f5Rg",
  "R5hCkh2AH58",
  "FqlLD7COCw4",
  "jozqnG_32i0",
  "j9Sn1nFGQQ8",
  "dT5Ck6bXBu8",
  "jrhUsgR5S4s",
  "e9r5hx47kxM",
  "IbWpQZsFIik",
  "ETaX9DZBSEk",
  "ZNGqBDRJgvo",
  "I-p3x84aqak",
  "DOZLSho2o-M",
  "s0y9OMuKfbU",
  "tq9bB6QPAdA",
  "QzCyF0lrioc",
  "KoOpFGuq2Kk",
  "sR1OHW_IReI",
  "ikQHkhL8YMM",
  "wcfPFLiS28s",
  "6bkY9ZS-9BA",
  "UkgVL05NsWo",
  "Mo-9CYItL3s",
  "UcoLNTG1tTo",
  "Nn9trJXUrp0",
  "aX93hgqcy9k",
  "5_Vthdkfzmk",
  "m2OR_JaXDaM",
  "NucG0kD3pkg",
  "qr6DxeGSfR8",
  "YA9ozz04Nfk",
  "z34enKCqRGk",
  "Tk6tA6OVqvk",
  "O4ARTL54N2U",
  "p1fEV6QbCww",
  "Y69mDJxFsRA",
  "2KuWjZD6PBA",
  "p86icWXs0CQ",
  "r2jXrdLygxw",
  "hMw-DUnR10s",
  "0GJNJ2fsFno",
  "FSVHx23ByhM",
  "dxx6fvhf5Pc",
  "3F1bHQEtOyM",
  "E7ldFrIdHZU",
  "0d9Oqm0Dt60",
  "vzR-mvlf15g",
  "cU6PxPLrhuc",
  "oRUvfEIuQrA",
  "y2Pay-MYsFw",
  "gdqGq0rZ5LU",
  "eA0nbtxfeq4",
  "ysUhh-JQZRw",
  "sZHc3zpncMk",
  "6wdxamIMJ-Y",
  "m9mrxvkPkKI",
  "gQtVsO6jFyg",
  "h2dqAADHnzw",
  "2yIELWjG8Tc",
  "oksESAMg7WM",
  "ZYAPgPH9hsI",
  "58ErHOchN8M",
  "iLUO_cS3xl8",
  "vC4CfQJLhuk",
  "-hb-TgZlhI0",
  "gjWRmoFIjjw",
  "bXTD4WvdG3M",
  "Xa--9CJ-Uic",
  "tbktye3f0oo",
  "_bYZ34u1Piw",
  "uQTBzmBDSv0",
  "mhjCyv6wulA",
  "Pt1pOY3_W64",
  "KH-BgU8N-Mk",
  "tnAoq3_6f5M",
  "6fILxnBH1Tg",
  "hWhgrA2dhrk",
  "FKLHDgbTD0k",
  "QzG5QWcKTSc",
  "zeKE0NHUtUw",
  "2zvHLGPpkO0",
  "tTu-Uhlu4RU",
  "eUUPlsi2gE8",
  "Ll9H9o8FJr0",
  "HA3Ks8NLS-Y",
  "O6OjhgzThM8",
  "L5q4uYj-gyg",
  "gaaLWh-5Esc",
  "pyXRV7wkeyo",
  "At23wicSNTQ",
  "-BPpop6Hbbs",
  "u72DI1aj8GU",
  "My-WSM-6QlE",
  "kR8rk3K6qzo",
  "t3WYvSQiaGE",
  "QFSunKPD-Zc",
  "kpnW68Q8ltc",
  "vAc1ux_kCYA",
  "Nvv9w-UPuSY",
  "Fo5JOpXnk5M",
  "CbmjqyB41vI",
  "KzKvPrIPVbE",
  "yB6gspLVQKQ",
  "ApreCAQiZ4w",
  "peNtwtLEg_g",
  "7iH8Qc9-gA8",
  "yKJHYgZyGb8",
  "YFHAYq40Z5I",
  "XgmILA3y22s",
  "SIoIKhCBq_I",
  "YP3M9_gICsc",
  "1rwAvUvvQzQ",
  "cPWBG6_jn4Y",
  "i67ZXLPeg9s",
  "r2JeL1ibBI0",
  "jOpzP33_USs",
  "oUn549UmSlw",
  "rvLs-9SA9i0",
  "EV6E13xODyA",
  "aTuE4BROrjA",
  "27qPvCq42lY",
  "f0SxVJ9Wpxw",
  "_w9B7uwLZeI",
  "pmP-1zELQZg",
  "KBP1zYwBzOE",
  "SHvhps47Lmc",
  "xZzWiFjsbM0",
  "DEVoC-LJIhc",
  "CqigaFzqhys",
  "4OksbeQdXRo",
  "l2otQZ70SUA",
  "Sr1bLLvsbh0",
  "PizL44RpB0s",
  "sXhhdNL05sY",
  "BLJ_o7urUVc",
  "H-AfGh8gmiQ",
  "Xq0joZ24D9Y",
  "iqkQRgGdAPo",
  "7RU7CohvsMU",
  "dgJWZiBt6_w",
  "4_-eEf91hwo",
  "F8cPDpXnQa0",
  "NIWyZmFSep0",
  "0F9Nvxyt9t8",
  "ALbVEmzY5S4",
  "gJkVwt_JJXo",
  "6s8wrKBLe14",
  "lI_C1Bjdqn4",
  "UigzN-4JR14",
  "RPtq1Bpf6q4",
  "_9J8ccza1OI",
  "cmzVnvl3xQg",
  "sQffJpzreoE",
  "Hh4L4RijCsw",
  "41tIUr_ex3g",
  "QHRuTYtSbJQ",
  "y9hh91-2iaA",
  "bPj_SmRW4lM",
  "q2DBeby7ni8",
  "mDdQBxbdj6k",
  "Jrg9KxGNeJY",
  "LijvcUx2LNg",
  "fdi06Y6oFDo",
  "pWO718iy5mY",
  "gGJenum-clc",
  "UNREuwdJCw0",
  "Eon9jJDK2q8",
  "7M_2aAIebwo",
  "mBMKuEfQrV4",
  "XheJnmLAwhk",
  "Y6ljFaKRTrI",
  "ovMtEj2u8ck",
  "obNox8vKuBY",
  "ys4rkcMbtjY",
  "b7Ef2ik_b2A",
  "cyWTgLf-piE",
  "SaNmV7Sx5_M",
  "6IiG4vo9k9U",
  "wTaAS0jxQu0",
  "Ynq429R03dE",
  "E0Pv54o_BKs",
  "Xqf8jID9TsE",
  "nCtn6igpgP4",
  "l7hsVkYh9Ts",
  "8_OSWJeVTg0",
  "wp1o1FIt7bs",
  "NSQZqVsaKWY",
  "JYC8aINHFxc",
  "uqp4Jc-XkCw",
  "DhXhCz1dKAQ",
  "oKDYjjvcjjA",
  "1CGMk_roNaE",
  "pQsQKtxG9D0",
  "cuN82OBSD9s",
  "7AjNEE1UVgE",
  "PzbnWihnBK4",
  "tJa8_9t--A0",
  "Ghk1RFr51xo",
  "NIvNCDl1a8s",
  "cc8Y9tkmXGU",
  "vAe3URPdJrw",
  "zjIVnDveefA",
  "Sdd2iQz24po",
  "ze0Rk-m0w2A",
  "CAL4WMpBNs0",
  "fFDhn4wgwKk",
  "UrAhnndvrSU",
  "9a4Rx7T_lwc",
  "lr4vi_XAjQQ",
  "1r9FA1GONCo",
  "iUjkBRKg2q0",
  "AejNS64BIlE",
  "Ue3s-hNNFvo",
  "_yGpoRbwe4s",
  "W4VTq0sa9yg",
  "1t8B3Sx8X-0",
  "CwE2k0HMDfo",
  "QwadGcuGJ1Q",
  "V9QV9PFVCs8",
  "wQWC14HCKYI",
  "scKwQa7bCR0",
  "XoGCokTDSyA",
  "8F2jf0NRl2Y",
  "5qyvePW7Wh4",
  "Qtf8YFw8iZg",
  "w3ReqY8-QQU",
  "7ppnVLHCeiU",
  "sIWnz0x_pSQ",
  "DiqpRhfRfOo",
  "88G-FndKZNk",
  "D-EfmNm7XLo",
  "WR7fwMM5ccc",
  "8QpUGCXwOks",
  "tEzYsaLm7nw",
  "84q83skr_tk",
  "JflsBihO_MQ",
  "WkZnRNbrBTI",
  "-WWjwsCCOFM",
  "l_wxCbTd5zY",
  "3oIwDvi_LP8",
  "QnfgNHK_VxY",
  "DSdjacXO9yE",
  "QRk4uC_o7eQ",
  "nIZxh_nc64w",
  "gvOQi7U6IZQ",
  "cwDazCRTup0",
  "CnJsQQWrmiM",
  "dVVZaZ8yO6o",
];




  console.log('hi');



  function PagesNavegation({ currentPage, setCurrentPage, playList }) {
    return (
      <>
        {currentPage === "PlaylistPage" && (
          <PlaylistPage
            changePage={setCurrentPage}
            choosenPlaylist={"Best Gaming Playlist"}
          />
        )}
        {currentPage === "GameModesPage" && (
          <GameModesPage changePage={setCurrentPage} />
        )}
  
        {currentPage === "WinnerPage" && (
          <WinnerPage changePage={setCurrentPage} />
        )}
  
        {currentPage === "NormalGamePage" && (
          <GamePage changePage={setCurrentPage} gameMode={"Normal"} />
        )}
  
        {currentPage === "QuickGamePage" && (
          <GamePage changePage={setCurrentPage} gameMode={"Quick"} />
        )}
  
        {currentPage === "HellGamePage" && (
          <GamePage changePage={setCurrentPage} gameMode={"Hell"} />
        )}
      </>
    );
  }
  


  //working game oage:

  function GamePage({}) {
    const [states, setStates] = useContext(statesContext);
    
  
    function gameConfig(gameMode, list) {
      let playList;
      let limitTime;
  
      if (gameMode === "Normal") {
        (playList = sliceList(list, 0.5)), (limitTime = 90);
      }
  
      if (gameMode === "Quick") {
        (playList = sliceList(list, 0.1)), (limitTime = 30);
      }
  
      if (gameMode === "Hell") {
        (playList = sliceList(list, 1)), (limitTime = 300);
      }
  
      return { playList, limitTime };
    }
  
  
    const { playList, limitTime } = gameConfig(
      states.gameMode,
      states.databasePlayList
    );
  
    const [currentPlaylist, setCurrentPlaylist] = useState(playList);
  
    useEffect(() => {
      console.log("Updated Playlist :", currentPlaylist);
    }, [currentPlaylist]);
  
    if (currentPlaylist.length >= 2) {
      let index1 = getRandomIndex(-1, currentPlaylist);
      let index2 = getRandomIndex(index1, currentPlaylist);
  
      let videoId1 = currentPlaylist[index1].videoId;
      let videoId2 = currentPlaylist[index2].videoId;
  
      let videoTitle1 = currentPlaylist[index1].title;
      let videoTitle2 = currentPlaylist[index2].title;
  
      return (
        <>
          {/* <Timer
            seconds={limitTime}
            videoIdsToRemove={[videoId1, videoId2]}
            funcToChangeState={setCurrentPlaylist}
          /> */}
  
          <Round
            stateChange={currentPlaylist}
            maxRound={currentPlaylist.length}
          />
  
          <Vote
            videoIdToRemove={videoId2}
            funcToChangeState={setCurrentPlaylist}
          />
  
          <Video videoId={videoId1} />
          <VideoTitle videoTitle={videoTitle1} />
  
          <br />
          <br />
  
          <Vote
            videoIdToRemove={videoId1}
            funcToChangeState={setCurrentPlaylist}
          />
          <Video videoId={videoId2} />
          <VideoTitle videoTitle={videoTitle2} />
        </>
      );
  
  
    }
  
    if (currentPlaylist.length === 1) {
      return (
        <>
          <WinnerPage videoId={currentPlaylist[0]} />
        </>
      );
    }
  }