'use client';
import { Fragment, useEffect, useMemo, useState, memo, useCallback } from "react";
import BaseModal from "@/components/auth/base-modal";
import UserProfileButton from "@/components/profile/user-profile";
import useAppContext from "@/hooks/useAppContext";
import { Menu } from '@headlessui/react';

function LoginBtn() {
  const { isAuthenticated, user } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

 

  const userProfile = useMemo(() => {
    console.log("User Profile Memoized");
    return isAuthenticated ? <UserProfileButton username={user?.username} /> : null;
  }, [isAuthenticated]);

  return (
    <>
      {!isAuthenticated ? (
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button
            
            className="h-[60px] w-[196px] rounded-md text-base font-bold text-white hover:bg-opacity-90 bg-gradient-to-r from-blue-400 to-purple-500 transition-all"
          >
            Welcome, Sign In
          </Menu.Button>
        </Menu>
      ) : (
        userProfile
      )}

    </>
  );
}

export default memo(LoginBtn);
