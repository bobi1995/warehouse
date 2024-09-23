"use client";
import { createStillage } from "@/lib/stillage/action";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

interface EditStillageProps {
  name: string;
  stillageId: number;
  shelves: number;
  columns: number;
}

const EditStillageForm: React.FC<EditStillageProps> = ({
  name,
  stillageId,
  shelves,
  columns,
}) => {
  const [newName, setNewName] = useState(name);
  const [newColumns, setNewColumns] = useState(columns);
  const [newShelves, setNewShelves] = useState(shelves);
  const router = useRouter();

  const handleCreate = async () => {
    //await createStillage({ name, columns, shelves });
    router.refresh();
  };

  return (
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
        <button
          type="submit"
          className="flex items-center bg-btn_green-normal text-white text-xl p-2  rounded-md hover:bg-btn_green-hover"
        >
          <PlusCircleIcon className="w-6 h-6" />
          Запази
        </button>
      </form>
    </div>
  );
};

export default EditStillageForm;
