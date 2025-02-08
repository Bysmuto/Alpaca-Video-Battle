 
import React from 'react';

export default function Video({ videoId,extra }) {
  return (
    <iframe
      className={`w-full h-full border-4 border-green-500  ${extra || ""}`}
      src={`https://www.youtube.com/embed/${videoId}`}
    />
  );
}
