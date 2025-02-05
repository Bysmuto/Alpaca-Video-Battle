import React from 'react'

export default function WindowFrame({title,content}) {
  return (
      <div className="flex flex-col w-full h-full border-4 border-main bg-white">
          <div id='winTitle' className="flex text-main justify-between items-center bg-white px-2 py-1 border-b-4 border-green-500">
           {title}
            <div className="flex items-center">
              <span className="text-3xl text-black mx-1 font-mono">-</span>
              <span className="text-3xl text-black mx-1 font-mono">□</span>
              <span className="text-3xl text-red-500 mx-1 font-mono font-extrabold">
                ×
              </span>
              
            </div>
          </div>
          <div id='winContent' className="bg-black border-b-4 border-green-500 w-full h-full">
            {content}
          </div>
        </div>
  )
}

