"use client";
import { deleteStillage, editStillage } from "@/lib/stillage/action";
import { useState } from "react";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/db/error-messages";

interface EditStillageProps {
  name: string;
  stillageId: number;
  shelves: number;
  columns: number;
  type: string;
}

const EditStillageForm: React.FC<EditStillageProps> = ({
  name,
  stillageId,
  shelves,
  columns,
  type,
}) => {
  const [newName, setNewName] = useState(name);
  const [newColumns, setNewColumns] = useState(columns);
  const [newShelves, setNewShelves] = useState(shelves);
  const [newType, setNewType] = useState(type);
  const handleCreate = async () => {
    try {
      await editStillage({
        name: newName,
        columns: newColumns,
        shelves: newShelves,
        id: stillageId,
        type: newType,
      });
      toast.success(`Успешно редактирахте стелаж ${newName}`);
    } catch (error: any) {
      toast.error(getErrorMessage(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteStillage(stillageId);
      toast.success(`Успешно изтрихте стелаж ${newName}`);
    } catch (error: any) {
      toast.error(getErrorMessage(error.message));
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mt-10">
        <form action={handleCreate} className="flex flex-col items-center">
          <div className="flex mb-3 items-center ">
            <label
              className="w-16 mb-3 mt-5 block text-xs font-medium text-gray-900 w-15"
              htmlFor="name"
            >
              Име стелаж:
            </label>
            <input
              className="ml-2 h-12 peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
              id="name"
              name="name"
              placeholder="Име на стелажа"
              required
              defaultValue={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="flex mb-3 items-center">
            <label
              className="w-16 mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="columns"
            >
              Брой колони:
            </label>
            <input
              className="ml-2 h-12 peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
              id="columns"
              name="columns"
              placeholder="Брой колони"
              required
              min="1"
              type="number"
              defaultValue={newColumns}
              onChange={(e) => setNewColumns(parseInt(e.target.value))}
            />
          </div>
          <div className="flex mb-3 items-center">
            <label
              className="w-16 mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="rows"
            >
              Брой редове:
            </label>
            <input
              className="ml-2 h-12 peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
              id="rows"
              name="rows"
              placeholder="Брой редове"
              required
              min="1"
              type="number"
              defaultValue={newShelves}
              onChange={(e) => setNewShelves(parseInt(e.target.value))}
            />
          </div>
          <div className="flex mb-3 items-center w-full">
            <label
              className="w-16 mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="type"
            >
              Тип (мат.):
            </label>
            <select
              className="ml-1 h-12 block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
              id="type"
              name="type"
              required
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            >
              <option value="SS">SS</option>
              <option value="ST">ST</option>
              <option value="ZN">ZN</option>
              <option value="AL">AL</option>
            </select>
          </div>
          <button
            type="submit"
            className="flex items-center bg-btn_green-normal text-white text-xl p-2  rounded-md hover:bg-btn_green-hover"
          >
            <PlusCircleIcon className="w-6 h-6" />
            Запази
          </button>
        </form>
      </div>
      <form action={handleDelete}>
        <button
          className="ml-auto mt-5 flex items-center bg-btn_red-normal text-white text-xl p-2  rounded-md hover:bg-btn_red-hover"
          type="submit"
        >
          <TrashIcon className="w-6 h-6" />
          Изтрий
        </button>
      </form>
    </>
  );
};

export default EditStillageForm;
