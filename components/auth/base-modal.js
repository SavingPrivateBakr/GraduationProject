'use client';
import { useState, useEffect } from "react";
import LoginModal from "@/components/auth/login-modal";
import RegisterModal from "@/components/auth/register-modal";
import useAppContext from "@/hooks/useAppContext";
import { useRouter } from "next/navigation";

export default function BaseModal( ) {
  const [isLoginState, setIsLogin] = useState(true);
  const { isAuthenticated } = useAppContext();
  const router = useRouter();
console.log("BaseModal isAuthenticated:", isAuthenticated);
 



  return (
    <div className="h-auto w-auto flex justify-center items-center bg-red-500 bg-opacity-50">
      <div className="relative w-auto  rounded-xl border border-gray-700 bg-[#0F172A] p-6 sm:p-10 md:p-12 shadow-xl text-white">
        {/* Close Button */}
        {isLoginState ? (
          <LoginModal
            onChangeModal={() => setIsLogin(false)}
            closeModal={() => {}} // Add if needed
          />
        ) : (
          <RegisterModal
            onChangeModal={() => setIsLogin(true)}
            closeModal={() => {}} // Add if needed
          />
        )}
      </div>
    </div>
  );
}
