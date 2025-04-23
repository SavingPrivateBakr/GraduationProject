import AboutPage from "@/app/(about)/about/page";
import AppProvider from "@/context/app-provider";
import LoginBtn from "@/components/auth/login";


import Link from "next/link";
export default function Landing() {
  return (
    <AppProvider>
      <section className="relative h-full flex items-center justify-center bg-gradient-to-b from-[#8b919e] to-[#3487f3] overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500/10 to-transparent"></div>
        
       
        
        {/* Centered content container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-blue-700 from-blue-400 to-blue-200">
                  Next-Generation
                </span>{' '}
                AI Solutions for Every Challenge
              </h1>
              
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Transform your business with our advanced AI platform. Automate processes, 
                gain powerful insights, and unlock new possibilities with state-of-the-art 
                machine learning technology.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/dashboard" 
                  className="w-full text-white
                   sm:w-auto bg-blue-600 hover:bg-blue-700 font-medium px-8 py-3 rounded-lg transition-all duration-200 flex items-center justify-center group shadow-lg hover:shadow-blue-500/20"
                >
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <a 
                  href="#learn-more" 
                  className="w-full sm:w-auto bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 border border-white/10 hover:border-white/20 shadow-lg"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppProvider>
  );
}