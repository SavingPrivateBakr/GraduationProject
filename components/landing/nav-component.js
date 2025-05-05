'use client';
import NavItem from "@/components/landing/nav-item";
import useAppContext from "@/hooks/useAppContext";
import { useEffect, useState } from "react";

const publicRoutes = [
  {
    icon: 'AiFillHome',
    title: 'Home',
    path: '/',
  },
  {
    icon: 'FaInfoCircle',
    title: 'SignIn',
    path: '/about',
  },
];

const authenticatedRoutes = [
  {
    icon: 'AiFillHome',
    title: 'Home',
    path: '/',
  },
  {
    icon: 'FaUser',
    title: 'Dashboard',
    path: '/dashboard',
  },
];

export default function NavComponent({ isMobile = false }) {
  const { isAuthenticated } = useAppContext();
  const [routesToShow, setRoutesToShow] = useState([]);

  useEffect(() => {
    setRoutesToShow(isAuthenticated ? authenticatedRoutes : publicRoutes);
  }, [isAuthenticated]);

  return (
    <nav className={`gap-9 font-medium  ${isMobile ? 'flex text-2xl flex-col ' : 'hidden md:flex items-center  text-xl'}`}>
      {routesToShow.map(({ icon, title, path }, index) => (
        <NavItem key={index} href={path} icon={icon} className="hover:text-blue-500 transition-colors ">
          {title}
        </NavItem>
      ))}
    </nav>
  );
}
