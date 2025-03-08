 
import React, { useContext } from 'react';
import { statesContext } from '../main'; // Adjust the path based on your project structure

export default function PlaylistInfo() {
  const [states] = useContext(statesContext);

  return (
    <div className="grid gap-4">
      {/* <h1 className='text-center md:text-right'> {states.databasePlayListName} </h1>  */}
      <h2 className='text-center'>   {states.databasePlayList
        ? Object.values(states.databasePlayList).length
        : 0}{' '}
       videos</h2>
     
    
    </div>
  );
}
