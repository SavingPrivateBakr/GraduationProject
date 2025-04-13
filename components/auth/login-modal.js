'use client';
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { EmailIcon, PasswordIcon } from "@/components/svgs/svgs";
import InputField from "@/components/auth/modals-input";
import * as ServerActions from "@/actions/login";
import {showErrorAlert} from "@/lib/alerts";
import useAppContext from "@/hooks/useAppContext";


export default function LoginModal({ onChangeModal,closeModal }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAppContext();

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
            // Login successful
            login({
                email: formData.email,
                username: message.username,
            })
            closeModal()

        } else {
            // Login failed
            showErrorAlert(message.message);
        }
        setIsSubmitting(false);


    };

    return (
        <div className="fixed inset-0 flex items-start justify-center content-center p-4" style={{ top: "15%" }}>
            <Dialog.Panel
                className="w-full max-w-md h-[500px] transform overflow-hidden
          
                bg-[#0F172A] rounded-xl p-8 border border-gray-700  text-left align-middle shadow-xl
                transition-all pt-6 sm:p-12 sm:pt-8 md:min-h-min
                md:min-w-[500px] md:p-14 md:pt-10 lg:p-16 lg:pt-16"
            >
               <Dialog.Title
    as="h1"
    className="text-4xl font-bold text-center mb-8 bg-gradient-to-r  bg-clip-text text-white"
>
    Login
</Dialog.Title>

                <form onSubmit={handleSubmit} className="mt-10 lg:mt-12">

                    {/*Email Input*/}
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

                    {/*Password Input*/}
                    <div className="relative mt-10 lg:mt-12">
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
                            className="absolute right-2 top-[58%] text-white -translate-y-1/2 cursor-pointer text-base font-bold hover:opacity-80"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    {/* Login Button */}
                    <div className="mt-8 flex justify-center sm:mt-11 md:mt-14 lg:mt-16">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`border-none cursor-pointer   w-full bg-gradient-to-r  text-white rounded-lg py-3 font-medium hover:opacity-90 disabled:opacity-50 appearance-none touch-manipulation flex items-center justify-center focus-visible:outline-blue-600 px-7  h-[60px] text-[20px] min-w-[180px]  bg-gradientPinkRed shadow-product  ${
                                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
                            }`}
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>

                {/* Register Button */}
                <div className="mt-8 flex justify-center">
                    <button
                        type="button"
                        onClick={onChangeModal}
                        disabled={isSubmitting}
                        className="border-none text-white cursor-pointer appearance-none touch-manipulation flex items-center
                        justify-center focus-visible:outline-blue-600 rounded-xl text-base font-bold hover:opacity-80"
                        
                    >
                        Create account
                    </button>
                </div>
            </Dialog.Panel>
        </div>
    );
}
