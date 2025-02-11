import PageBackComponent from "@/components/general/page_back";
import HistoryTable from "@/components/history/history-table";
import Pagination from "@/components/in/users/pagination";
import SearchUser from "@/components/in/users/search-user";
import { Params } from "@/db/interfaces/params";
import { Transaction } from "@/db/interfaces/types";
import { getTransactions, getCountTransactions } from "@/lib/transaction/read";
import React from "react";
import itemsPerPage from "@/components/general/items-per-page";

const HistoryPage = async ({ searchParams }: Params) => {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || ""; // Get query parameter
  const transactions = (await getTransactions(
    currentPage,
    query
  )) as Transaction[];
  const totalPages = await getCountTransactions(query);

  return (
    <div>
      <PageBackComponent />

      <div className="w-11/12 py-5 items-center bg-white shadow-lg rounded-lg m-auto">
        <div className="w-11/12 m-auto">
          <SearchUser placeholder="Търси по код..." />
        </div>
        <HistoryTable transactions={transactions} />
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default HistoryPage;
