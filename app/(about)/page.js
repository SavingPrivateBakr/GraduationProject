import AboutPage from "@/app/(about)/about/page";
import AppProvider from "@/context/app-provider";
import LoginBtn from "@/components/auth/login";
export default function Landing() {
  
    return (
      <AppProvider><div>
  
       <div className="flex flex-col justify-center gap-24 items-center  mt-32 font-inter  px-6 md:px-16">
        
       
          <h1 className="text-7xl md:text-8xl font-bold text-white ">
            Career Compass AI
          </h1>
       
          <div className="flex items-center justify-start w-6/12">
          <p className="items-center text-gray-400 text-4xl text-center">
            Unlock Your Professional Potential with AI-Powered Career Guidance 
          </p>
          </div>
          <AppProvider>
            <div className="bg-gradientPinkRed p-1 rounded-lg">
          <LoginBtn/>
          </div>
          </AppProvider>
        </div> 
        </div>
        </AppProvider>
    );
}
