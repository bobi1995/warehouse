"use client";
import { createStillage } from "@/lib/stillage/action";
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/db/error-messages";

const CreateStillageForm = () => {
  const [name, setName] = useState("");
  const [columns, setColumns] = useState(1);
  const [shelves, setShelves] = useState(1);
  const [type, setType] = useState("SS");

  const handleCreate = async () => {
    try {
      await createStillage({ name, columns, shelves, type });
      toast.success(`Успешно създадохте стелаж ${name}`);
      setName("");
      setColumns(1);
      setShelves(1);
    } catch (error: any) {
      toast.error(getErrorMessage(error.message));
    }
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={columns}
            onChange={(e) => setColumns(parseInt(e.target.value))}
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
            value={shelves}
            onChange={(e) => setShelves(parseInt(e.target.value))}
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
            value={type}
            onChange={(e) => setType(e.target.value)}
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
  );
};

export default CreateStillageForm;
