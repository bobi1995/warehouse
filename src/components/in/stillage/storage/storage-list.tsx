import { table, thead } from "@/ui/table-style";
import EditBtn from "@/components/in/stillage/storage/edit-btn";
import { Storage } from "@/db/interfaces/types";

const StorageList = ({ storages }: { storages: Storage[] }) => {
  return (
    <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-8 flex flex-col justify-between">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Всички Складове
      </h1>
      <table className={`${table} w-full`}>
        <thead className={thead}>
          <tr>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Име
            </th>

            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Редактирай
            </th>
          </tr>
        </thead>
        <tbody>
          {storages.map((storage: Storage) => (
            <tr key={storage.id}>
              <td className="border px-4 py-4 sm:pl-6">{storage.name}</td>

              <td className="border px-4 py-4 sm:pl-6">
                <EditBtn name={storage.name} storageId={storage.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StorageList;
