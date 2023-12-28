'use client'

import { Pagination } from "flowbite-react";
import { useState } from "react";

type Props = {
  currentPage: number;
  pageCount: number;
  changePage: (page: number) => void;
};

export default function AppPagination({ currentPage, pageCount, changePage }: Props) {
  
  return (
    <Pagination
      currentPage={currentPage}
      onPageChange={(e: number) => changePage(e)}
      totalPages={pageCount}
      layout="pagination"
      showIcons={true}
      className="text-blue-500 mb-5"
    />
  );
}
