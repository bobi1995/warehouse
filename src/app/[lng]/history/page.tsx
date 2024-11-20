import PageBackComponent from "@/components/general/page_back";
import HistoryTable from "@/components/history/history-table";
import Pagination from "@/components/in/users/pagination";
import { Params } from "@/db/interfaces/params";
import { Transaction } from "@/db/interfaces/types";
import { getTransactions, getCountTransactions } from "@/lib/transaction/read";
import React from "react";

const HistoryPage = async ({ searchParams }: Params) => {
  const currentPage = Number(searchParams?.page) || 1;
  const transactions = (await getTransactions(currentPage)) as Transaction[];
  const totalPages = await getCountTransactions();

  return (
    <div>
      <PageBackComponent />
      <div className="w-11/12 py-5 items-center bg-white shadow-lg rounded-lg m-auto">
        <HistoryTable transactions={transactions} />
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default HistoryPage;
