import React, { useState } from "react";

function ChatInput({ onSend, setInputShow  ,inputshow }) {
  const [message, setMessage] = useState("");
 
  const handleSend = () => {
    if (!inputshow && message.trim()) {
      onSend(message);
      setMessage("");
      setInputShow(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };


  return (
    <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={inputshow}
        placeholder="Type a message..."
        className={`flex-grow p-2 rounded-l-lg border border-gray-300 focus:outline-none transition-all duration-200 ${
          inputshow ? "bg-gray-200 cursor-not-allowed text-gray-500" : "bg-white"
        }`}
      />
      {inputshow && (
      <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-60 pointer-events-none z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primaryBlack" />
      </div>
    )}
      <button
        onClick={handleSend}
        disabled={inputshow}
        className={`px-4 py-2 rounded-r-lg ml-2 text-white transition-all duration-200 ${
          inputshow
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black hover:bg-gray-800"
        }`}
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;
