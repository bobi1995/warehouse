"use client";
import { useState } from "react";
import { editStorage, deleteStorage } from "@/lib/storage/action";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/db/error-messages";

const EditStorageForm = ({ name, id }: { name: string; id: number }) => {
  const [newName, setNewName] = useState(name);
  const handleEdit = async () => {
    try {
      await editStorage({
        name: newName,
        id,
      });
      toast.success(`Успешно редактирахте склад ${newName}`);
    } catch (error: any) {
      toast.error(getErrorMessage(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteStorage(id);
      toast.success(`Успешно изтрихте склад ${newName}`);
    } catch (error: any) {
      toast.error(getErrorMessage(error.message));
    }
  };
  return (
    <>
      <div className="flex flex-col items-center mt-10">
        <form action={handleEdit} className="flex flex-col items-center">
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

export default EditStorageForm;
