'use client';
import NavItem from "@/components/landing/nav-item";
import useAppContext from "@/hooks/useAppContext";
import { useEffect,useState } from "react";

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

export default function NavComponent() {
  const { isAuthenticated } = useAppContext();
    const [routesToShow,setroutesToShow] = useState([]);
  useEffect(() => {

    setroutesToShow(isAuthenticated ? authenticatedRoutes : publicRoutes);
  
  }, [isAuthenticated]);


  return (
    <nav className="hidden lg:flex items-center gap-6 text-lg font-medium">
      {routesToShow.map(({ icon, title, path }, index) => (
        <NavItem key={index} href={path} icon={icon}>
          {title}
        </NavItem>
      ))}
    </nav>
  );
}
