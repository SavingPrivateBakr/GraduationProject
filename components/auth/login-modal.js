'use client';
import { useState } from "react";
import { EmailIcon, PasswordIcon } from "@/components/svgs/svgs";
import InputField from "@/components/auth/modals-input";
import * as ServerActions from "@/actions/login";
import { showErrorAlert } from "@/lib/alerts";
import useAppContext from "@/hooks/useAppContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginModal({ onChangeModal, closeModal }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAppContext();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = await ServerActions.login(formData);

    if (message.success) {
      login({
        email: formData.email,
        username: message.username,
      });
      router.push("/");
    } else {
      showErrorAlert(message.message);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="relative h-auto w-auto bg-red-500 flex justify-center items-center bg-opacity-50">
      <div className="relative rounded-2xl w-auto bg-[#0F172A] p-10 sm:p-14 md:p-16 shadow-2xl text-white ">
        <h1 className="text-5xl font-bold text-center mb-12">Login</h1>

        <form onSubmit={handleSubmit}  >
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

          <div className="relative mt-12 ">
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
              disabled={isSubmitting}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 text-base font-semibold"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="mt-10">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-[60px] bg-blue-600 text-white rounded-xl font-semibold text-2xl ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
              }`}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <div className="flex justify-center mt-8">
          <Link className="text-lg text-gray-400 hover:underline" href="/about/forgetpassword">
            Forgot password?
          </Link>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onChangeModal}
            disabled={isSubmitting}
            className="text-white font-bold text-lg hover:opacity-80"
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}
