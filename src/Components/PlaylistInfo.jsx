 
import React, { useContext } from 'react';
import { statesContext } from '../main'; // Adjust the path based on your project structure

export default function PlaylistInfo() {
  const [states] = useContext(statesContext);

  return (
    <div className="">
      {states.databasePlayListName} -{" "}
      {states.databasePlayList
        ? Object.values(states.databasePlayList).length
        : 0}{" "}
      videos
    </div>
  );
}
