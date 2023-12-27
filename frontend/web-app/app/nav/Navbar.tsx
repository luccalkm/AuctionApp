import React from "react";
import { AiOutlineCar } from 'react-icons/ai';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md">
      <div className="flex items-center gap-2 text-3xl font-semibold text-red-500">
        <AiOutlineCar size={34} />
        <div>Bid Wheels</div>
      </div>
      <div>TODO: Search</div>
      <div>TODO: Login</div>
    </header>
  );
}
