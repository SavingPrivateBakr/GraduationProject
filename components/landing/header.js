import Link from "next/link";
import {FaBug} from "react-icons/fa";
import NavComponent from "@/components/landing/nav-component";
import LoginBtn from "@/components/auth/login";
import AppProvider from "@/context/app-provider";

export default async function Header({atsClass='text-primaryBlack'}) {

    return (
        <header className="sticky top-0 z-50 w-full  px-3 pt-4 md:px-6 lg:px-2 xl:px-6 rounded-l-xl rounded-r-xl shadow-lg">

        <div
            className="grid w-full grid-cols-[max-content_max-content] items-center bg-slate-800
             justify-between gap-4 rounded-large py-3 lg:grid-cols-[max-content_1fr_max-content] lg:px-4 hover:bg-opacity-90 transition-all"
        >
    
                {/* Name */}
                <Link
                    href="/"
                    className={`ml-4 flex items-center gap-2 text-xl text-white font-semibold ${atsClass}`}
                >
                CareerCompass
                </Link>

                <AppProvider>
                    {/* Navigation */}
                    <NavComponent/>
                    {/* Login */}
                    <LoginBtn/>
                </AppProvider>

            </div>
        </header>
    );
}