import AboutPage from "@/app/(about)/about/page";

export default function Landing() {
    return (
        <div className="flex flex-col justify-center gap-24 items-center  mt-32 font-inter  px-6 md:px-16">
          
       
          <h1 className="text-7xl md:text-8xl font-bold text-white ">
            Career Compass AI
          </h1>
       
          <div className="flex items-center justify-start w-6/12">
          <p className="items-center text-gray-400 text-4xl text-center">
            Unlock Your Professional Potential with AI-Powered Career Guidance 
          </p>
          </div>

          <button className="bg-gradientPinkRed text-4xl text-white px-8 py-3 rounded-lg hover:bg-blue-600">
        Sign In
      </button>

        </div>
    );
}
