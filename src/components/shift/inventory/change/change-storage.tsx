"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Material, Stillage, Storage } from "@/db/interfaces/types";
import { createInventory } from "@/lib/inventory/action";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/db/error-messages";
import printLabel from "@/utils/printLabel";
import labelBody from "@/db/label-body";

interface ChangeStorageProps {
  storages: Storage[];
  storage: Storage | null | undefined;
  setStorage: (storage: Storage) => void;
  setStillage: (stillage: Stillage | undefined) => void;
}
const ChangeStorage: React.FC<ChangeStorageProps> = ({
  storage,
  storages,
  setStorage,
  setStillage,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleStorageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStillage(undefined);
    const choosen = storages.find((s) => s.id === parseInt(e.target.value));
    if (choosen) {
      setStorage(choosen);
      setIsOpen(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="w-52 bg-gradient-to-r from-gray-300 to-gray-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg border border-gray-400 hover:from-gray-400 hover:to-gray-600 hover:shadow-xl transition-all duration-300">
          КЪМ СКЛАД
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed grid inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="max-h-[90vh] overflow-y-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg  p-6">
          <Dialog.Title className="text-lg font-semibold mb-4 text-center flex items-center justify-center space-x-3">
            Избери Склад
          </Dialog.Title>
          <Dialog.Description className="mb-4 text-gray-600">
            Избирайки склад, ще преместите материала в някое от предвидените за
            съхранение места, които не са Стелажи.
          </Dialog.Description>
          <div>
            <div className="flex mb-3 items-center w-full">
              <label
                className="w-16 mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="type"
              >
                Склад:
              </label>
              <select
                className="ml-1 h-12 block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                id="type"
                name="type"
                required
                value={storage?.id}
                onChange={handleStorageChange}
              >
                {storages.map((s) => (
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

export default ChangeStorage;
