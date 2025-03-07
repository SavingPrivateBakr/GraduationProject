import localFont from "next/font/local";
import "../globals.css";
import "./dashboard.css";
import AppProvider from "@/context/app-provider";

import Header from "@/components/landing/header"

import {geistMono, geistSans} from "@/app/fonts";

export const metadata = {
    title: "ATS Crack",
    description: "Make Your Resume Stand Out",
};



export default function RootLayout({children}) {
    return (

        <div className={`${geistSans.variable} ${geistMono.variable} antialiased bg-specialSandLight relative flex min-h-screen w-full flex-col items-center`}>
            <AppProvider>
    
                {children}
            </AppProvider>
        </div>
        

    );
}
