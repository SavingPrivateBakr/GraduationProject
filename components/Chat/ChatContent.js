'use client';
import { useState, useEffect, useRef } from "react";

function ChatContent({ message }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (message) {
      const normalizedMessage = typeof message === "string"
        ? { text: message, sender: "user" }
        : message;

      setMessages((prev) => [...prev, normalizedMessage]);
    }
  }, [message]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col flex-grow overflow-y-auto mb-4 px-2">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`px-2 py-2 mt-2 rounded-lg shadow-sm break-words whitespace-pre-wrap w-fit max-w-[75%] ${
            msg.sender === "user"
              ? "bg-slate-200 self-end text-right"
              : "bg-white self-start text-left"
          }`}
        >
          <p className="text-gray-800 ">{msg.text}</p>
        </div>
      ))}
      <div ref={scrollRef} />
    </div>
  );
}

export default ChatContent;
