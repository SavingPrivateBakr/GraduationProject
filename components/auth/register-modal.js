'use client';
import { EmailIcon, PasswordIcon, UserIcon } from "@/components/svgs/svgs";
import InputField from "@/components/auth/modals-input";
import { useState } from "react";
import useAppContext from "@/hooks/useAppContext";
import * as ServerActions from "@/actions/register";
import { showErrorAlert, showSuccess } from "@/lib/alerts";

export default function RegisterModal({ onChangeModal, closeModal }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    username: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAppContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      showErrorAlert("Invalid email address");
      return false;
    }
    if (formData.password.length < 8) {
      showErrorAlert("Password must be at least 8 characters");
      return false;
    }
    if (formData.password !== formData.passwordConfirm) {
      showErrorAlert("Passwords don't match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const message = await ServerActions.register(formData);
    
    if (message.success) {
      onChangeModal();
      showSuccess("Check your email for verification link");
    } else {
      showErrorAlert(message.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div className=" h-auto flex justify-center items-center bg-opacity-50">
      <div className="relative  w-full max-w-md rounded-xl  bg-[#0F172A] p-6 sm:p-10 md:p-12 shadow-xl text-white">
      

        <h1 className="text-4xl  font-bold text-center mb-8">Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
          
            id="usernameId"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            label="Username"
            Icon={UserIcon}
            disabled={isSubmitting}
          />

          <InputField
            id="emailId"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            label="Email"
            Icon={EmailIcon}
            disabled={isSubmitting}
          />

          <div className="relative">
            <InputField
              id="passwordId"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              label="Password"
              Icon={PasswordIcon}
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-white"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <InputField
            id="confirmPasswordId"
            type={showPassword ? "text" : "password"}
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            label="Confirm Password"
            Icon={PasswordIcon}
            disabled={isSubmitting}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full h-[50px] bg-blue-600 text-white rounded-lg font-medium text-lg ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
            }`}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onChangeModal}
            disabled={isSubmitting}
            className="text-white font-bold text-base hover:opacity-80"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
}