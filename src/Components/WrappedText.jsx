import React from "react";

export default function WrappedText({ text}) {
  return (
    <div className={`w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs md:text-xl`}>
      {text}
    </div>
  );
}
