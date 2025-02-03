import { useState, useEffect } from "react";

export default function Button({ name, func, extra }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (isButtonDisabled) {
      const timer = setTimeout(() => {
        setIsButtonDisabled(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isButtonDisabled]);

  const handleClick = async () => {
    setIsButtonDisabled(true);
    console.log("pressed");
    if (typeof func === "function") {
      await func();
    }
  };

  return (
    <button
      className={`relative bg-cover bg-center bg-no-repeat px-8 py-4 bg-main text-lg border-b-4 border-l-4 border-green-900 shadow-inner active:border-t-4 active:border-r-4 active:border-green-900 active:border-gray-200 active:translate-y-[2px] ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""} ${extra || ""}`}
      onClick={handleClick}
      disabled={isButtonDisabled}
    >
      {name}
    </button>
  );
}

