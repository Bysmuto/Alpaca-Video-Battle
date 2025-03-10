import { useContext } from "react";
import { statesContext } from "../main.jsx";


export async function getVideoTitle(videoId) {
  const ytk = "AIzaSyAcM3fuIbRmXAPVUAsbi7wpywukclOu2a0";
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${ytk}&part=snippet`
  );
  const data = await response.json();
  return data.items[0].snippet.title;
}

export async function getVideoIds(playlistId) {
  const ytk = "AIzaSyAcM3fuIbRmXAPVUAsbi7wpywukclOu2a0";
  let videoIds = [];
  let nextPageToken = "";
  let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${playlistId}&maxResults=50&key=${ytk}`;

  do {
    const res = await fetch(nextPageToken ? url + `&pageToken=${nextPageToken}` : url);
    const data = await res.json();

    videoIds.push(...data.items.map(item => item.contentDetails.videoId));
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);
  console.log(videoIds);
  return videoIds;

}


export function getVideoId(url) {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:.*[?&]v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const videoId = url.match(regex)[1];
  return videoId;
}

export function getPlaylistId(url) {
  const regex = /[?&]list=([a-zA-Z0-9_-]+)/;
  const playlistId = url.match(regex);
  if(playlistId){
    return playlistId[1] 
  }
 
}







export function getRandomIndex(excludeIndex = -1, list) {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * list.length);
  } while (randomIndex === excludeIndex);
  return randomIndex;
}

export function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2)}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export function removeItemFromState(itemToRemove, funcToChangeState) {
  funcToChangeState((prevItens) =>
    prevItens.filter((item) => item !== itemToRemove)
  );
}

export function sliceList(list, fraction) {
  return list
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.ceil(list.length * fraction));
}

export function changeState(func, stateUpdates) {
  func((prevState) => ({
    ...prevState,
    ...stateUpdates,
  }));
}

export function getRandomIndices(count, list, excludeIndices = []) {
  const indices = [];
  while (indices.length < count) {
    const randomIndex = Math.floor(Math.random() * list.length);
    if (!indices.includes(randomIndex) && !excludeIndices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }
  return indices;
}

export function shuffleArray(array) {
  // Create a copy to avoid modifying original array
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Generate random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

export function probability(...weightedValues) {
  // Calculate the total weight
  const totalWeight = weightedValues.reduce(
    (sum, [_, weight]) => sum + weight,
    0
  );

  // Normalize weights to make the total sum equal to 1
  weightedValues = weightedValues.map(([value, weight]) => [
    value,
    weight / totalWeight,
  ]);

  // Generate a random number between 0 and 1
  const random = Math.random();

  // Find the value corresponding to the random number
  let cumulativeWeight = 0;
  for (const [value, weight] of weightedValues) {
    cumulativeWeight += weight;
    if (random < cumulativeWeight) {
      return Array.isArray(value)
        ? value[Math.floor(Math.random() * value.length)]
        : value;
    }
  }
}


export function ensureEvenLength(arr) {
  if (arr.length % 2 !== 0) {
    arr.pop(); // Remove the last element
  }
  return arr;
}

export function separateIntoPairs(arr) {
  arr = trimToPowerOfTwo(arr);

  let pairs = [];
  for (let i = 0; i < arr.length; i += 2) {
    pairs.push(arr.slice(i, i + 2));
  }
  return pairs;
}

function trimToPowerOfTwo(arr) {
  let n = arr.length;
  let power = 1;

  while (power * 2 <= n) {
    power *= 2;
  }

  return arr.slice(0, power); // Trim array to the closest lesser power of two
}


export function preparePlaylist(playlist) {
  const [states] = useContext(statesContext);

  const uniqueList = Array.from(new Map(playlist.map(item => [item.videoId, item])).values());

  const shuffled = shuffleArray(uniqueList);
  const sliced = shuffled.slice(0, states.playlistMaxNumber);

  if (states.gameMode === "GameTournament") {
    const paired = separateIntoPairs(sliced);
    return paired;
  }

  return sliced;
}


