import { table, thead } from "@/ui/table-style";
import CellBtn from "@/components/in/stillage/cell-btn";
import EditBtn from "@/components/in/stillage/edit-btn";
import { Stillage } from "@/db/interfaces/types";

const StillageList = ({ stillages }: { stillages: Stillage[] }) => {
  return (
    <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-8 flex flex-col justify-between">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Всички Стелажи
      </h1>
      <table className={`${table} w-full`}>
        <thead className={thead}>
          <tr>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Име
            </th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Вид
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
              <td className="border px-4 py-4 sm:pl-6">{stillage.name}</td>
              <td className="border px-4 py-4 sm:pl-6">{stillage.type}</td>
              <td className="border px-4 py-4 sm:pl-6">{stillage.shelves}</td>
              <td className="border px-4 py-4 sm:pl-6">{stillage.columns}</td>
              <td className="border px-4 py-4 sm:pl-6">
                <CellBtn
                  shelves={stillage.shelves}
                  columns={stillage.columns}
                  name={stillage.name}
                  stillageId={stillage.id}
                  cells={stillage.cells}
                />
              </td>
              <td className="border px-4 py-4 sm:pl-6">
                <EditBtn
                  name={stillage.name}
                  stillageId={stillage.id}
                  shelves={stillage.shelves}
                  columns={stillage.columns}
                  type={stillage.type}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StillageList;
