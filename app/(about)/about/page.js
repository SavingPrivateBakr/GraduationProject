"use client";
import React from "react";

import RegisterModal from "@/components/auth/register-modal";
import AppProvider from "@/context/app-provider";
import BaseModal from "@/components/auth/base-modal";
import { useState,useCallback } from "react";
import useAppContext from "@/hooks/useAppContext";

export default function authpage() {


  const [isOpen, setIsOpen] = useState(true);

  const closeModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

    return (
    
        
          <AppProvider>
                 <div className="flex flex-col justify-center gap-24 items-center  mt-10 font-inter  px-6 md:px-16">
               <BaseModal/>
                   </div>
              
               </AppProvider>
      
    
     
      );
}
