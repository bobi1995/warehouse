"use client";
import { createStillage } from "@/lib/stillage/action";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateStillageForm = () => {
  const [name, setName] = useState("");
  const [columns, setColumns] = useState(1);
  const [shelves, setShelves] = useState(1);
  const router = useRouter();

  const handleCreate = async () => {
    await createStillage({ name, columns, shelves });
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
            defaultValue={name}
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
            defaultValue={columns}
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
            defaultValue={shelves}
            onChange={(e) => setShelves(parseInt(e.target.value))}
          />
        </div>
        <button
          type="submit"
          className="bg-btn_green-normal text-white p-2 w-24 hover:bg-btn_green-hover"
        >
          Запази
        </button>
      </form>
    </div>
  );
};

export default CreateStillageForm;
