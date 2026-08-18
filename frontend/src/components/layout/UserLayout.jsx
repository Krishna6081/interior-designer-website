import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F2] text-[#26221F] antialiased selection:bg-[#B08D57]/20 selection:text-[#26221F]">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

