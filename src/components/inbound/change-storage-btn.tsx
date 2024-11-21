"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Material, Storage } from "@/db/interfaces/types";
import { createInventory } from "@/lib/inventory/action";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/db/error-messages";
import printLabel from "@/utils/printLabel";
import labelBody from "@/db/label-body";

interface ChangeStorageBtnProps {
  storages: Storage[];
  lesto_code:string,
  desc:string|null|undefined;
  inventory: {
    quan_dev: number;
    quan_ok: number;
    materialId: number;
    lot: string;
    order: string;
    comment: string;
    deliveryDate: Date;
    inboundDate: Date;
  };
  setMaterial: (material: Material | null) => void;
  email:string
}

const ChangeStorageBtn: React.FC<ChangeStorageBtnProps> = ({
  storages,
  inventory,
  setMaterial,
  email,
  lesto_code,
  desc
}) => {
  const {
    quan_dev,
    quan_ok,
    materialId,
    lot,
    order,
    comment,
    deliveryDate,
    inboundDate,
  } = inventory;
  const [storage, setStorage] = React.useState<Storage | undefined>(
    storages[0]
  );
  const handleStorageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const storage = storages.find((s) => s.id === parseInt(id));
    setStorage(storage);
  };
  const handleCreate = async () => {
    try {
     const res= await createInventory({
        quan_dev,
        quan_ok,
        materialId,
        lot,
        order,
        comment,
        deliveryDate,
        inboundDate,
        storageId: storage?.id,
        email
      });      
      setMaterial(null);

      await printLabel(
        labelBody(
        lesto_code,
       desc,
          order,
          lot,
        deliveryDate.toDateString(),
          (quan_dev + quan_ok).toString(),
          comment,
          res.inventory.id.toString()
        )
      );


      toast.success(`Успешно заскладихте материал в склад ${storage?.name}`);
    } catch (error: any) {
      toast.error(getErrorMessage(error.message));
    }
  };
  return (
    <Dialog.Root>
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
            <div className="text-center">
              <button
                onClick={handleCreate}
                className="w-52 bg-gradient-to-r from-green-300 to-green-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg border border-green-400 hover:from-green-400 hover:to-green-600 hover:shadow-xl transition-all duration-300"
              >
                ЗАСКЛАДИ
              </button>
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

export default ChangeStorageBtn;
