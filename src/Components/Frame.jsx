import React from "react";

function Frame({ children,width }) {


  return <div className= {`p-4 m-4 border-4 border-main ${width || ''}`}>
    {children}
    </div>;
}

export default Frame;
