
export default function Page({children}) {
  

  return (
    <>
      <div className="flex items-center justify-center h-[100vh] w-[100vw]">
        <div className="flex flex-col items-center ">
        {children}
        </div>
      </div>
    </>
  );
}
