"use client"; 
import React, { useState, createContext, useContext, useEffect } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatContent from "./ChatContent";
// Context Provider Component

function ChatBox({setShowChat}) {

     const [sender, onSend] = useState("");


      return (
        <div   
          
          className='fixed bottom-4 right-4 w-[450px] h-[450px] bg-gray-100  rounded-lg shadow-lg overscroll-contain overflow-hidden flex flex-col '>
        {/* Header */}
      <ChatHeader setShowChat={setShowChat}/>
  
        {/* Chat Content */}
       <ChatContent message={sender}/>
  
        {/* Input Field */}
        <ChatInput onSend={onSend}  />
      </div>
    );
}





const ChatToggleButton = ({setShowChat}) => {
  

  return (
    <div
      onClick={() => setShowChat(true)}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#ffff",
        color: "white",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        fontSize: "24px",
        zIndex: 9999,
      }}
    >
      💬
    </div>
  );
};


const ChatWidget = () => {
 

     const [showChat, setShowChat] = useState(false);



  return (
    <>
     {!showChat && <ChatToggleButton setShowChat={setShowChat} />}

      {showChat && (<ChatBox setShowChat={setShowChat}/> )
      }
    </>
  );
};



export default ChatWidget;
