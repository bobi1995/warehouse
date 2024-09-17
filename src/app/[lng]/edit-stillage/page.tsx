import getStillages from "@/lib/stillage/read";
import React from "react";
import { table, thead } from "@/ui/table-style";
import { Stillage } from "@/db/interfaces/types";
import CellBtn from "@/components/in/edit-stillage/cell-btn";

const EditStillagePage = async () => {
  const stillages = await getStillages();
  console.log(stillages);
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mt-10">
        Всички Стелажи
      </h1>
      <table className={`${table}`}>
        <thead className={thead}>
          <tr>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Име
            </th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Редове
            </th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Колони
            </th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Клетки
            </th>
          </tr>
        </thead>
        <tbody>
          {stillages.map((stillage: Stillage) => (
            <tr key={stillage.id}>
              <td className="px-4 py-4 sm:pl-6">{stillage.name}</td>
              <td className="px-4 py-4 sm:pl-6">{stillage.shelves}</td>
              <td className="px-4 py-4 sm:pl-6">{stillage.columns}</td>
              <td className="px-4 py-4 sm:pl-6">
                <CellBtn
                  shelves={stillage.shelves}
                  columns={stillage.columns}
                  name={stillage.name}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditStillagePage;
