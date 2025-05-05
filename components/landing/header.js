'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { BrainCog, Menu, X } from "lucide-react";
import NavComponent from "@/components/landing/nav-component";
import LoginBtn from "@/components/auth/login";

export default function Header({ atsClass = 'text-primaryBlack' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? 'shadow-md ' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center gap-2 text-xl font-bold ${atsClass}`}
          >
            <BrainCog className="h-6 w-6 text-blue-400" />
            CareerCompass
          </Link>

          {/* Nav - Desktop */}
          <div className="hidden  md:flex justify-center flex-1">
            <NavComponent />
          </div>

          {/* Login + Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <LoginBtn />
            </div>
            <button
              className={`md:hidden ${isScrolled ? 'text-black' : 'text-white'}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 " /> : <Menu className={`w-6 ${!isScrolled ? ' text-white ' : 'text-black' } h-6`} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden  fixed rounded-b-b-large top-15 left-0 right-0 z-40 backdrop-blur-sm  transition-all duration-300  text-white px-6 py-6  animate-slide-down${
          isScrolled ? 'shadow-md ' : 'bg-transparent bg-slate-900'
        } `}>
          <div className="flex flex-col gap-6">
            <LoginBtn />
            <NavComponent isMobile={true} />
          </div>
        </div>
      )}
    </header>
  );
}
