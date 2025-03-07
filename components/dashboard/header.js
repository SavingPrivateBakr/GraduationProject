'use client'
import Link from "next/link";
import { FaBug } from "react-icons/fa";
import NavComponent from "@/components/landing/nav-component";
import useAppContext from "@/hooks/useAppContext";
import LoginBtn from "@/components/auth/login";

export default function DashBoardHeader() {

    return (
        <div className="sticky top-0 z-50 w-full bg-transparent px-3 pt-4 md:px-6 lg:px-2 xl:px-6">
            <div
                className="grid w-full grid-cols-[max-content_max-content]
                 items-center justify-between gap-4 rounded-xl py-3
                  lg:grid-cols-[max-content_1fr_max-content] lg:px-4 hover:bg-white hover:bg-opacity-90 transition-all"
            >
                {/* Name */}
                <Link
                    href="/"
                    className="ml-4 flex items-center gap-2 text-xl font-semibold text-primaryBlack"
                >
                    <FaBug className="text-primaryBlack" /> Ats~Cracker
                </Link>
                <NavComponent />
                <LoginBtn/>
            </div>
        </div>
    );
}