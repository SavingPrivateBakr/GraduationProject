"use client";
import React from "react";

import RegisterModal from "@/components/auth/register-modal";
import AppProvider from "@/context/app-provider";
import BaseModal from "@/components/auth/base-modal";
import { useState,useCallback } from "react";
import useAppContext from "@/hooks/useAppContext";
import ForgotPasswordModal from "@/components/auth/forgetpassword";
export default function forget() {


  
    return (
    
        
        
                 <div className="flex flex-col justify-center gap-24 items-center  mt-20 font-inter  px-6 md:px-16">
               <ForgotPasswordModal/>
                   </div>
              
              
      
    
     
      );
}
