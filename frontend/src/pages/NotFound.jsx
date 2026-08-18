import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/common/Button";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F7] text-center px-4 py-20">
      <span className="font-serif text-8xl font-bold text-[#B08D57] mb-4">404</span>
      <h1 className="font-serif text-3xl sm:text-4xl text-[#2F2A26] font-normal mb-4">
        Page Not Found
      </h1>
      <p className="text-base text-[#6B625B] max-w-md font-light mb-8">
        The architectural page you are looking for has moved, been renamed, or does not exist.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          Return to Homepage
        </Button>
      </Link>
    </div>
  );
};
