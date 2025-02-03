
import Button from "./Button";
import WrappedText from "./WrappedText";
import YoutubeVideo from "./YoutubeVideo";
import WindowFrame from "./WindowFrame";

export default function VideoCard({ videoId, videoTitle, vote }) {
  return (
    <div className="space-y-5 flex flex-col items-center justify-center h-[60vh] w-[40vw] m-4">
      <WindowFrame
        title={<WrappedText text={videoTitle}  textColor="text-main" />}
        content={<YoutubeVideo videoId={videoId} />}
      />
      <Button name="vote" func={vote} extra="w-full" />
    </div>
  );
}
