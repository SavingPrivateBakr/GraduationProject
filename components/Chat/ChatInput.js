import React, { useState } from "react";

function ChatInput({ onSend }) {

    const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("")
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className='flex items-center bg-white p-3 rounded-lg shadow-sm'>
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className='flex-grow p-2 rounded-l-lg border border-gray-300 focus:outline-none'
        placeholder='Type a message...'
      />
      <button
        onClick={handleSend}
        className='bg-black text-white px-4 py-2 rounded-r-lg ml-2'
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;
