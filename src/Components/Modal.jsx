import { useState } from "react";

function SimpleModal({title}, {text}) {
  const [isOpen, setIsOpen] = useState(true); // Modal is open by default

  return (
    <div className="flex justify-center items-center bg-gray-100">
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2>{title}</h2>
            <p>{text}</p>
            <button 
              onClick={() => setIsOpen(false)} 
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SimpleModal;
