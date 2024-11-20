"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Stillage } from "@/db/interfaces/types";

interface ChangeStillageBtnProps {
  stillages: Stillage[];
  stillage?: Stillage;
  setStillage: (stillage: Stillage) => void;
}

const ChangeStillageBtn: React.FC<ChangeStillageBtnProps> = ({
  stillages,
  stillage,
  setStillage,
}) => {
  const handleStillageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const choosen = stillages.find((s) => s.id === parseInt(e.target.value));
    if (choosen) {
      setStillage(choosen);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="w-52 bg-gradient-to-r from-red-300 to-red-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg border border-red-400 hover:from-red-400 hover:to-red-600 hover:shadow-xl transition-all duration-300">
          СМЕНИ СТЕЛАЖ
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed grid inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="max-h-[90vh] overflow-y-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg  p-6">
          <Dialog.Title className="text-lg font-semibold mb-4 text-center flex items-center justify-center space-x-3">
            Избери стелаж
          </Dialog.Title>
          <Dialog.Description className="mb-4 text-gray-600">
            Избирането на стелаж различен от препоръчания може да доведе до
            смесване на материали от различен вид и качество.
          </Dialog.Description>
          <div>
            <div className="flex mb-3 items-center w-full">
              <label
                className="w-16 mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="type"
              >
                Стелаж:
              </label>
              <select
                className="ml-1 h-12 block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                id="type"
                name="type"
                required
                value={stillage?.id}
                onChange={handleStillageChange}
              >
                {stillages.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
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

export default ChangeStillageBtn;
