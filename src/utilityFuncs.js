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
