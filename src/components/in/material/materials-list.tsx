import { Material } from "@/db/interfaces/types";
import getMaterials from "@/lib/material/read";
import { table, thead } from "@/ui/table-style";
import React from "react";
import EditMaterial from "./edit-material";
import Pagination from "../users/pagination";
import itemsPerPage from "@/components/general/items-per-page";
import SearchUser from "../users/search-user";
import { useSearchParams } from "next/navigation";
import MaterialTable from "./material-table";

const MaterialsList = async ({ page }: { page: number }) => {
  const materials = (await getMaterials()) as Material[];

  return (
    <div className="w-full mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Всички Материали
      </h1>
      <MaterialTable materials={materials} page={page} />
    </div>
  );
};

export default MaterialsList;
