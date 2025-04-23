import localFont from "next/font/local";
import "./globals.css";
import { geistMono, geistSans } from "@/app/fonts";
import Header from "@/components/landing/header";
import AppProvider from "@/context/app-provider";
export const metadata = {
  title: "CareerCompass",
  description: "Make Your Resume Stand Out",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
         <AppProvider>
      <body className="antialiased bg-specialSandLight">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl animate-pulse-slow animation-delay-4000"></div>
          <Header atsClass="text-white" />
          <main >
            {children}
          </main>
      
      </body>
      </AppProvider>
    </html>
  );
}