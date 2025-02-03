 
import React from 'react';

export default function Video({ videoId }) {
  return (
    <iframe
      className="w-full h-full"
      src={`https://www.youtube.com/embed/${videoId}`}
    />
  );
}
