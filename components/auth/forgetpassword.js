'use client';
import { useState } from "react";
import { EmailIcon } from "@/components/svgs/svgs";
import InputField from "@/components/auth/modals-input";
import { forgetpassword } from "@/actions/login";
import { showErrorAlert, showSuccess } from "@/lib/alerts";
import useAppContext from "@/hooks/useAppContext";
import { useRouter } from "next/navigation";

export default function ForgotPasswordModal({ onChangeModal, closeModal }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = await forgetpassword({ email});
  
    if (message.success) {
        showSuccess("Password reset link sent successfully.");
      router.push("/about"); // Redirect to the login page after successful reset link request
    } else {
      showErrorAlert(message.message);
    }

    setIsSubmitting(false);
  };

  const onchangepage = () => {
    router.push("/about");
  }

  return (
    <div className="h-auto flex justify-center items-center bg-red-500 bg-opacity-50">
      <div className="relative w-full max-w-md rounded-xl border border-gray-700 bg-[#0F172A] p-6 sm:p-10 md:p-12 shadow-xl text-white">
        {/* Close Button */}
       

        <h1 className="text-4xl font-bold text-center mb-8">Forgot Password</h1>

        <form onSubmit={handleSubmit}  >
          <InputField
            id="emailId"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            label="Enter your email"
            Icon={EmailIcon}
            disabled={isSubmitting}
          />

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-[50px] bg-blue-600 text-white rounded-lg font-medium text-lg ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={onchangepage}
            disabled={isSubmitting}
            className="text-white font-bold text-base hover:opacity-80"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
