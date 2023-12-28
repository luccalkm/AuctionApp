'use client';

import { useParamsStore } from "@/hooks/useParamsStore";
import React from "react";
import { AiOutlineCar } from "react-icons/ai";

export default function Logo() {
  const { reset } = useParamsStore();
  return (
    <div
      onClick={reset}
      className="flex cursor-pointer items-center gap-2 text-3xl font-semibold text-red-500"
    >
      <AiOutlineCar size={34} />
      <div>Bid Wheels</div>
    </div>
  );
}
