import PageBackComponent from "@/components/general/page_back";
import CreateStillageForm from "@/components/in/stillage/create-stillage";
import React from "react";
import { table, thead } from "@/ui/table-style";
import { Stillage } from "@/db/interfaces/types";
import getStillages from "@/lib/stillage/read";
import CellBtn from "@/components/in/stillage/cell-btn";
import EditBtn from "@/components/in/stillage/edit-btn";

const CreateStillagePage = async () => {
  const stillages = await getStillages();

  return (
    <div>
      <PageBackComponent />
      <div className="flex justify-center items-center py-10">
        <div className="flex flex-col md:flex-row justify-between items-stretch w-11/12 max-w-9xl space-y-6 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-8 flex flex-col justify-between">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Създай Стелаж
            </h1>
            <CreateStillageForm />
          </div>
          <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-8 flex flex-col justify-between">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
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
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Редактирай
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
                        stillageId={stillage.id}
                        cells={stillage.cells}
                      />
                    </td>
                    <td className="px-4 py-4 sm:pl-6">
                      <EditBtn
                        name={stillage.name}
                        stillageId={stillage.id}
                        shelves={stillage.shelves}
                        columns={stillage.columns}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStillagePage;
