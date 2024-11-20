"use client";
import React, { useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon, PencilIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { editInventory } from "@/lib/inventory/action";
import { Inventory } from "@/db/interfaces/types";
import { getErrorMessage } from "@/db/error-messages";

const EditInventory = ({ data }: { data: Inventory }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleIncrement = (fieldName: string) => {
    const inputElement = document.getElementsByName(
      fieldName
    )[0] as HTMLInputElement;
    const currentValue = parseInt(inputElement.value) || 0;
    inputElement.value = (currentValue + 1).toString();
  };

  const handleDecrement = (fieldName: string) => {
    const inputElement = document.getElementsByName(
      fieldName
    )[0] as HTMLInputElement;
    const currentValue = parseInt(inputElement.value) || 0;
    inputElement.value = Math.max(currentValue - 1, 0).toString();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const formObject = {
      lot: formData.get("plavka")?.toString() || "",
      order: formData.get("nPorchka")?.toString() || "",
      comment: formData.get("comment")?.toString() || "",
      quan_ok: parseInt(formData.get("broyBezOtk")?.toString() || "0"),
      quan_dev: parseInt(formData.get("broySOtk")?.toString() || "0"),
    };

    if (formObject.quan_ok === 0 && formObject.quan_dev === 0) {
      toast.error("Моля въведете брой!");
      return;
    }
    try {
      await editInventory(data.id, formObject);
      if (formRef.current) {
        formRef.current.reset();
      }
      toast.success("Успешно редактирахте наличността!");
    } catch (error: any) {
      toast.error(getErrorMessage(error.message));
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <PencilIcon className="w-5 h-5 hover:cursor-pointer" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed grid inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="max-h-[90vh] overflow-y-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg  p-6">
          <Dialog.Title className="text-lg font-semibold mb-4 text-center flex items-center justify-center space-x-3">
            Редактирай наличностите
          </Dialog.Title>
          <Dialog.Description className="mb-4 text-gray-600">
            Редактирането на наличностите тук, НЕ означава изписване. Всяко
            изписване трябва да се извърши през секция "Изписване".
          </Dialog.Description>
          <div>
            <form ref={formRef} onSubmit={handleSubmit} className="p-4  w-full">
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="plavka">
                  Плавка:
                </label>
                <input
                  type="text"
                  id="plavka"
                  name="plavka"
                  className="mt-1 block w-full border border-red-500 rounded-md p-2 focus:outline-none focus:ring focus:ring-red-300"
                  placeholder="00000000"
                  defaultValue={data.lot}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="nPorchka">
                  Nº Поръчка:
                </label>
                <input
                  type="text"
                  id="nPorchka"
                  name="nPorchka"
                  className="mt-1 block w-full border border-red-500 rounded-md p-2 focus:outline-none focus:ring focus:ring-red-300"
                  placeholder="00000000"
                  defaultValue={data.order}
                  required
                />
              </div>

              <div className="flex justify-between">
                <div className="w-1/2 items-center">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-center">
                      Брой без отклонение:
                    </label>
                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        className="bg-red-500 text-white rounded-md p-2 mr-2"
                        onClick={() => handleDecrement("broyBezOtk")}
                      >
                        −
                      </button>
                      <input
                        type="text"
                        name="broyBezOtk"
                        defaultValue={data.quan_ok}
                        readOnly
                        className="w-16 text-center border border-gray-300 rounded-md p-2"
                      />
                      <button
                        type="button"
                        className="bg-green-500 text-white rounded-md p-2 ml-2"
                        onClick={() => handleIncrement("broyBezOtk")}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-center">
                      Брой с отклонение:
                    </label>
                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        className="bg-red-500 text-white rounded-md p-2 mr-2"
                        onClick={() => handleDecrement("broySOtk")}
                      >
                        −
                      </button>
                      <input
                        type="text"
                        name="broySOtk"
                        readOnly
                        className="w-16 text-center border border-gray-300 rounded-md p-2"
                        defaultValue={data.quan_dev}
                      />
                      <button
                        type="button"
                        className="bg-green-500 text-white rounded-md p-2 ml-2"
                        onClick={() => handleIncrement("broySOtk")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <textarea
                  className="w-1/2 h-32 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Напиши коментар за материала, ако е необходимо..."
                  id="comment"
                  name="comment"
                  defaultValue={data.comment ? data.comment : ""}
                ></textarea>
              </div>
              <div className="flex justify-center mt-10">
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-md p-2"
                >
                  Потвърди
                </button>
              </div>
            </form>
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <XMarkIcon color="red" width={30} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditInventory;
