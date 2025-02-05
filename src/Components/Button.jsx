export default function Button({ name, func, extra, disabled }) {
  return (
    <button
      className={`px-8 py-4 bg-main text-lg border-b-4 border-l-4 border-green-900 shadow-inner 
        active:border-t-4 active:border-r-4 active:border-green-900 active:border-gray-200 active:translate-y-[2px] 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${extra || ""}`}
      onClick={() => func()}
      disabled={disabled}
    >
      {name}
    </button>
  );
}
