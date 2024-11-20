import { Material } from "@/db/interfaces/types";
import getMaterials from "@/lib/material/read";
import { table, thead } from "@/ui/table-style";
import React from "react";
import EditMaterial from "./edit-material";
import Pagination from "../users/pagination";
import itemsPerPage from "@/components/general/items-per-page";

const MaterialsList = async ({ page }: { page: number }) => {
  const materials = (await getMaterials()) as Material[];
  const { data, totalPages } = itemsPerPage(page, materials);

  return (
    <div className="w-full mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Всички Материали
      </h1>
      <table className={`w-11/12 ${table}`}>
        <thead className={thead}>
          <tr>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Код
            </th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Описание
            </th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Материал
            </th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Размери (мм)
            </th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Тегло (кг)
            </th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Редактирай
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((material: Material) => (
            <tr key={material.id}>
              <td className="border px-4 py-4 sm:pl-6">
                {material.lesto_code}
              </td>
              <td className="border px-4 py-4 sm:pl-6">{material.desc}</td>
              <td className="border px-4 py-4 sm:pl-6">{material.type}</td>
              <td className="border px-4 py-4 sm:pl-6">
                {material.diameter
                  ? `⌀${material.diameter}x${
                      material.size_height
                        ? material.size_height
                        : material.size_length
                    }`
                  : `${material.size_height}x${material.size_width}x${material.size_length}`}
              </td>
              <td className="border px-4 py-4 sm:pl-6">
                {material.weight ? material.weight.toFixed(2) : 0}
              </td>
              <td className="border px-4 py-4 sm:pl-6">
                <EditMaterial material={material} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default MaterialsList;
