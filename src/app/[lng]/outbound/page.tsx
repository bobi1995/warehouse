import PageBackComponent from "@/components/general/page_back";
import TableInventory from "@/components/reference/table-inventory";
import { Params } from "@/db/interfaces/params";
import React from "react";

const OutboundPage = ({ searchParams }: Params) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div>
      <PageBackComponent />
      <TableInventory query={query} currentPage={currentPage} type="outbound" />
    </div>
  );
};

export default OutboundPage;