'use client';

import { useState, useEffect, useRef } from "react";
import { botreply } from "@/actions/cvs";
import useAppContext from "@/hooks/useAppContext";

function ChatContent({ message, setInputShow }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);
  const { resumeData, setResumeData } = useAppContext();
  const [oldResumeData, setOldResumeData] = useState(resumeData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!message) return;

    const handleMessage = async () => {
      setLoading(true);
      

      const normalizedMessage =
        typeof message === "string"
          ? { text: message, sender: "user" }
          : message;

      setMessages((prev) => [...prev, normalizedMessage]);

      try {
      
        const response = await botreply(normalizedMessage.text,resumeData.data);
          console.log("Bot reply responsess:", response);
        const botMessage = {
          text: response.success==true? "Have Been Changed" : "Sorry, I didn't understand that.",
          sender: "bot",
        };

        setMessages((prev) => [...prev, botMessage]);

        if (response.success) {
          console.log("Bot reply response data:", response.response.data);
          setOldResumeData(resumeData);
          console.log("Old Resume Data:", resumeData);
          console.log("New Resume Data:", response.response);
          setResumeData(response.response);
        }
        
      } catch (error) {
        console.error("Bot reply failed:", error);
        setMessages((prev) => [
          ...prev,
          { text: "An error occurred. Please try again.", sender: "bot" },
        ]);
      } finally {
        setInputShow(false);
        setLoading(false);
       
      }
    };

    handleMessage();
  }, [message]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (


    <div className="flex flex-col flex-grow overflow-y-auto mb-4 px-2 relative min-h-0">
       
    
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`px-3 py-2 mt-2 rounded-xl shadow-sm break-words whitespace-pre-wrap w-fit max-w-[75%] transition-all duration-200 ${
            msg.sender === "user"
              ? "bg-slate-200 self-end text-right"
              : "bg-white self-start text-left"
          }`}
        >
          <p className="text-gray-800">{msg.text}</p>
        </div>
      ))}
  
      <div ref={scrollRef} />
    </div>
  );
}

export default ChatContent;
