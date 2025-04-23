'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { BrainCog } from "lucide-react";
import NavComponent from "@/components/landing/nav-component";
import LoginBtn from "@/components/auth/login";
import AppProvider from "@/context/app-provider";

export default function Header({ atsClass = 'text-primaryBlack' }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      } bg-transparent`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center py-4">
          {/* Left - Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className={`flex items-center gap-2 text-xl font-bold text-white ${atsClass}`}
            >
              <BrainCog className="h-6 w-6 text-blue-400" />
              CareerCompass
            </Link>
          </div>

          {/* Center - Nav */}
          <div className="flex justify-center">
          
              <NavComponent />
           
          </div>

          {/* Right - Login */}
          <div className="flex justify-end">
          
              <LoginBtn />
           
          </div>
        </div>
      </div>
    </header>
  );
}
