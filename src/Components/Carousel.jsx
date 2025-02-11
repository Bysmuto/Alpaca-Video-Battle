export default function Carousel({ items }) {
    return (
      <div className="w-full overflow-x-auto whitespace-nowrap scroll-smooth">
        <div className="flex gap-4">
          {items.map((item, i) => (
            <div key={i} className="w-64 h-40 bg-gray-300 flex items-center justify-center text-2xl rounded-lg">
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }