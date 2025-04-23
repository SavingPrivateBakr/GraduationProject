import localFont from "next/font/local";
import "../globals.css";

import AppProvider from "@/context/app-provider";

import Header from "@/components/landing/header"

import {geistMono, geistSans} from "@/app/fonts";



export default function RootLayout({children}) {
    return (

      
            <AppProvider>
    
                {children}
            </AppProvider>
       
        

    );
}
