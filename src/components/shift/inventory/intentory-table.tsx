import { Inventory } from "@/db/interfaces/types";
import React from "react";
import { thead } from "@/ui/table-style";
import moment from "moment";

const InventoryTable = ({ inventory }: { inventory: Inventory }) => {
  return (
    <div className="w-full lg:w-1/4">
      <table className="w-full text-gray-900  mt-10">
        <thead className={thead}>
          <tr>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Поле
            </th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Стойност
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-4 sm:pl-6">Лесто Код</td>
            <td className="px-4 py-4 sm:pl-6">
              {inventory.material.lesto_code}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-4 sm:pl-6">Описание</td>
            <td className="px-4 py-4 sm:pl-6">{inventory.material.desc}</td>
          </tr>
          <tr>
            <td className="px-4 py-4 sm:pl-6">Заскладено на</td>
            <td className="px-4 py-4 sm:pl-6">
              {moment(inventory.inboundDate).format("DD/MMM/YYYY HH:mm")}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-4 sm:pl-6">Партида</td>
            <td className="px-4 py-4 sm:pl-6">{inventory.lot}</td>
          </tr>
          <tr>
            <td className="px-4 py-4 sm:pl-6">Поръчка</td>
            <td className="px-4 py-4 sm:pl-6">{inventory.order}</td>
          </tr>
          <tr>
            <td className="px-4 py-4 sm:pl-6">Наличност</td>
            <td className="px-4 py-4 sm:pl-6">
              {inventory.quan_dev + inventory.quan_ok}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-4 sm:pl-6">Стелаж</td>
            <td className="px-4 py-4 sm:pl-6">
              {inventory.stillage
                ? inventory.stillage.name
                : inventory.storage?.name}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
