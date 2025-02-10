import { getVideoTitle } from "./utilityFuncs"; // Adjust the path if needed
import { addItemToDatabase } from "./database";

const playlist = ["y9ECyBCdLww","xmbBOKULrrA","gTy0Wo_j9iw","LP4vrygNRd0","qunx4AkuQOU","15nfu5yld8s","KTkeu-k6uzM","PCOlrOJwgzQ","p3WpUVsrAI0","xsCsS12qPLM","dv3P9iXeTSs","0R8T_jBARA0","3sZY-Jgl0Og","iMXCgdzrLow","-gVmnZmiYfc","IdLqq0zeeZA","H0YgLDsIZjE","3fvOLLmvqwE","O8Z0_BdbXf4","uV5FWTRDfNc","21X5jJDxE7w","In7k1TMiN8E","QGPZ-9OvJDM","X2wH8T6DbL8","ThJAcWBn6Oo","VGABlXx5GGs","xI9wxfmofvY","plmEhqk2pTM","PtOpmZy4jjs","xPeVVBBfD2Q","7T6KCVA6HhM","82kKQeti4tU","XsuwdGxl09c","SKFGZ0szuy4","qx_ND6zt1cU","bI1RKXIoDR8","Xsj11XcJRu4","3BBz8EDBs5U","lRRZRobYJAQ","k-c0iPB1CR4","2TcwnS3LcXQ","rBAmDQLG9JA","D_uIUwuY8hY","O_AsyLahbT8","bYFxtgrIv_k","OBoeYfaSn-8","6aeSlGcafJo","AeQ-xD2qcyo","soAVMxMConU","DdtNLgwf_9s","q5ITBeS8i8Q","sTavyxyoFzY","Fb2KvvBs7ow","Tcg-ln9Ohmg","AA6YdbOCssQ","6ub6rlwWMjM","Bbb4yXObA8A","4v6vkCNYplE","AUDM-XIdohw","-SAZ3F06V5w","n4nG0uS-ZiQ","22J5cCFi9l0","uT438sfYICY","OXNOcSK0q9I","pa6aut0eecA","r4r88YFHYuQ","JYSks46t6X8","TbOhuKKZPG8","ZnlRlg47yt8","u7L6PLJrSyI","RmBoZNLG3Bo","QX2476UG_aQ","dBT4q4kYZ-o","_QtlRHAi8ds","mW1RHgWnVlE","I65wqB5noD0","KjDXGI9BSsM","gRaF6ufIrLY","okhiO3wJNLU","VGsscD--gGw","X1wsA8ogep0","j3ri77IkGtM","UhPyxd77e8k","lpbaFrRSUwM","DDXuUmweESA","1S63W8zUdS8","00EpyPaXujg","1zckBcMxbQU","O3rLRsuNPvQ","TdLkL4Wa9EM","VuRbvxuCsPo","FHFc-gKcdX8","kk1LtDkzuT8","NLp2drKW_cs","F1DZXoi5rRE","IaaMvEdUvcI","1lB618AxMQw","8gY0pSmCAMU","hSlgYVi1igs","iteiytPtiFI","wxrScdy5S64","a69OoaKDpOQ","wUPEGFwLaAI","Ck7nf4cO94c","rWjM3K2KSKE","YHLf4LNnjY8","HzEiRqnO90E","KCSDDxEN6Nc","PqqCW4VgIEI","I5jMTAzPT7w","ogdaNcn-Kv8","b8-Qxh4jEMg","9Z60l8GhWmQ","pqJm6EaDOo0","oFYmmhsR46I","SKTOey-Axas","S3frzVJF1l4","zbaPgElRGPw","OEJ43vBitqo","ogMOyFxZoIU","1skpSNj6R_k","RZbxYG8XOSk","go9f4uOnRCA","-cFGqTocqW8","LF5xkm7Wovg","ljEgqofoLjU","lqQs5Y4yI6U","bMkdk1qzY-E","sovXX-zLZBE","4g_wV1jjxPA","mkS91n_IQVQ","OnUgq7GUcwQ","95A1hRrHgD4","wLRfkBxoHvY","HjqyLAn2LTU"]

const playlistId = "-OIjx481LnGqEgfIh1O6"

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
