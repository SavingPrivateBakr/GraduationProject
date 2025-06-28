function ChatHeader({setShowChat})
{
    return (
       
        <div className='bg-black text-white py-4 px-5 flex justify-between items-center rounded-t-lg'>
          <h2 className='m-0 text-lg'>Chat Assistant</h2>
          <button
            onClick={() => setShowChat(false)} // Close button functionality
            className='bg-none border-none text-white text-2xl cursor-pointer leading-none'
          >
            &times;
          </button>
        </div>
      
    );
}
export default ChatHeader;