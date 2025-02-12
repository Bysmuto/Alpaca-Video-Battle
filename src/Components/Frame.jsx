import React from "react";

function Frame({ children }) {


  return <div className="flex flex-col items-center justify-center  m-4 p-4  w-[80%] md:w-[50vw] h-[60vh]  border-4 border-main">
    {children}
    </div>;
}

export default Frame;
