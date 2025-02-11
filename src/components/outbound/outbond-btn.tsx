"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { outbondInventory } from "@/lib/inventory/action";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/db/error-messages";
interface RequestedQuantities {
  [key: string]: {
    quantity: number;
    materialDesc: string;
    lot: string;
    order: string;
    lesto_code: string;
    materialId: number;
  };
}

const OutbondBtn = ({
  requiredQuantities,
  setRequestedQuantities,
  email,
}: {
  requiredQuantities: RequestedQuantities;
  setRequestedQuantities: any;
  email?: string | null;
}) => {
  const arrayOfObjects = Object.keys(requiredQuantities).map((key) => ({
    id: parseInt(key),
    ...requiredQuantities[key],
  }));
  const outbounding_objects = arrayOfObjects.map((item) => {
    return {
      materialId: item.materialId,
      quantity: item.quantity,
      id: item.id,
    };
  });

  const handleCreate = async () => {
    if (outbounding_objects && outbounding_objects.length > 0) {
      try {
        await outbondInventory(outbounding_objects, email);

        setRequestedQuantities({});
        toast.success(`Успешно изписахте избраните материали`);
      } catch (error: any) {
        toast.error(getErrorMessage(error.message));
      }
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="w-40 bg-gradient-to-r from-green-300 to-green-500 text-white font-bold py-2 px-2 rounded-lg shadow-lg border border-green-400 hover:from-green-400 hover:to-green-600 hover:shadow-xl transition-all duration-300">
          ИЗПИШИ
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed grid inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="max-h-[90vh] overflow-y-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg  p-6">
          <Dialog.Title className="text-lg font-semibold mb-4 text-center flex items-center justify-center space-x-3">
            Изписване на материали
          </Dialog.Title>
          <Dialog.Description className="mb-4 text-gray-600">
            След изписване на материалите, те ще бъдат премахнати от
            наличността. Логистичният отдел има задачата да извади избраните
            материали.
          </Dialog.Description>
          <div className="justify-center gap-4 flex">
            <button
              onClick={handleCreate}
              className="w-28 bg-gradient-to-r from-green-300 to-green-500 text-white font-bold  rounded-lg shadow-lg border border-green-400 hover:from-green-400 hover:to-green-600 hover:shadow-xl transition-all duration-300"
            >
              Потвърди
            </button>

            <Dialog.Close asChild>
              <button className="w-28 bg-gradient-to-r from-red-300 to-red-500 text-white font-bold  rounded-lg shadow-lg border border-red-400 hover:from-red-400 hover:to-red-600 hover:shadow-xl transition-all duration-300">
                Откажи
              </button>
            </Dialog.Close>
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

export default OutbondBtn;
