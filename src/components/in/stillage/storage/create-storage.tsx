"use client";
import { createStorage } from "@/lib/storage/action";
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/db/error-messages";

const CreateStorage = () => {
  const [name, setName] = useState("");

  const handleCreate = async () => {
    try {
      await createStorage({ name });
      toast.success(`Успешно създадохте стелаж ${name}`);
      setName("");
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
            Име склад:
          </label>
          <input
            className="ml-2 h-12 peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
            id="name"
            name="name"
            placeholder="Име на склад"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
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

export default CreateStorage;
