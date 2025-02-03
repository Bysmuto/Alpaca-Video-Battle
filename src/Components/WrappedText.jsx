import React from "react";

export default function WrappedText({ text,textColor }) {
  return (
    <div className={`w-[90%] ${textColor} overflow-hidden text-ellipsis whitespace-nowrap`}>
      {text}
    </div>
  );
}
