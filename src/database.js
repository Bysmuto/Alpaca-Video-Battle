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
 
export async function fetchPlaylists() {
  const snapshot = await get(ref(database, `/playLists`));
  if (snapshot.exists()) {
    const playLists = snapshot.val();

    return { playLists };
  }
}

export async function fetchPlaylist(playlist) {
  const snapshot = await get(ref(database, `/playLists/${playlist}`));
  if (snapshot.exists()) {
    const playList = snapshot.val();

    return { playList };
  }
}


export async function removeItemFromDatabase(playlistName, itemKey) {
  try {
    // Reference to the specific item in the playlist
    const itemRef = ref(database, `/playLists/${playlistName}/videos/${itemKey}`);

    // Remove the item from the database
    await set(itemRef, null);

    console.log(`Item "${itemKey}" removed from playlist "${playlistName}".`);
  } catch (error) {
    console.error("Error removing item:", error);
  }
}



export async function addItemToDatabase(playlistName, itemData) {
  try {
    // Reference to the playlist
    const playlistRef = ref(database, `/playLists/${playlistName}/videos`);

    // Push the new item to the playlist
    const newItemRef = await push(playlistRef, itemData);

    console.log(`Item added to playlist "${playlistName}" with key: ${newItemRef.key}`);
  } catch (error) {
    console.log("Error adding item:", error);
  }
}



export async function addPlaylistToDatabase(playlistName) {
  try {
    // Reference to the playlist
    const playlistRef = ref(database, `/playLists/`);

    // Push the new item to the playlist
    const newItemRef = await push(playlistRef, playlistName);

    console.log(`Item added to playlist "${playlistName}" with key: ${newItemRef.key}`);
  } catch (error) {
    console.log("Error adding item:", error);
  }
}