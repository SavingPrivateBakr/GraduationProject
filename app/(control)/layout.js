import localFont from "next/font/local";
import "../globals.css";
import "./dashboard.css";
import AppProvider from "@/context/app-provider";

import Header from "@/components/landing/header"

import {geistMono, geistSans} from "@/app/fonts";

export const metadata = {
   
    description: "Make Your Resume Stand Out",
};



export default function RootLayout({children}) {
    return (

        <div >
            <AppProvider>
    
                {children}
            </AppProvider>
        </div>
        

    );
}
