import { getVideoTitle } from "./utilityFuncs"; // Adjust the path if needed
import { addItemToDatabase } from "./database";

const playlist = ["BTivsHlVcGU","pDddlvCfTiw","LjxulQ1bEWg","H58vbez_m4E","_WCD3Z9UmJ4","9v_rtaye2yY","oorVWW9ywG0","UNZqm3dxd2w","I0fgkcTbBoI","xOjy0tL5EuA","nUEqPtVGIpE","28hYUZMufDg","B9synWjqBn8","tvTRZJ-4EyI","LPTlvQ1Zet0","fjUGC8g4GOE","_Rzm7cPzVUo","U4mADkt6o-M","vX9msKu75qs","Y19q-7VN2WI","S-sJp1FfG7Q","Q9pjm4cNsfc","Kbj2Zss-5GY","2xWkATdMQms","HIwAI05Y1fU","E5ONTXHS2mM"]

const playlistId = "-OIecTghma5f7BHYZHi2";
async function sendVideo(videoId) {
  try {
    const title = await getVideoTitle(videoId);
    addItemToDatabase(playlistId, { title: title, videoId: videoId }).then(() =>
      console.log(videoId + "uploded")
    );
  } catch (error) {
    console.log(error);
  }
}

function click() {
  playlist.forEach((video) => {
    sendVideo(video);
  });
}

export default function UploadPlayList(params) {
  return (
    <>
      <div className="h-[100vh] flex justify-center items-center">
        <button className="bg-main p-4" onClick={click}>
          upload
        </button>
      </div>
    </>
  );
}
