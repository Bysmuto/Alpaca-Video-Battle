export async function getVideoTitle(videoId) {
  const ytk = "AIzaSyAcM3fuIbRmXAPVUAsbi7wpywukclOu2a0";
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${ytk}&part=snippet`
  );
  const data = await response.json();
  return data.items[0].snippet.title;
}

export function getVideoId(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:.*[?&]v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const videoId = url.match(regex)[1];
  return videoId;
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

//---

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

export  function  separateIntoPairs(arr) {
  arr = ensureEvenLength(arr);
  let pairs = [];
  for (let i = 0; i < arr.length; i += 2) {
    let pair = arr.slice(i, i + 2);
    pairs.push(pair);
  }
  return pairs;
}
