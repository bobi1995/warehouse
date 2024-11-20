import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import EditStorageForm from "./edit-storage-form";
// import EditStillageForm from "./edit-form";

interface EditBtnProps {
  name: string;
  storageId: number;
}
const EditBtn: React.FC<EditBtnProps> = ({ name, storageId }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex  px-4 py-2 bg-main-100 text-white rounded  hover:bg-main-200">
          <PencilSquareIcon className="w-6 h-6" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed grid inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="max-h-[90vh] overflow-y-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg max-w-2xl w-full p-6">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Склад {name}
          </Dialog.Title>
          <Dialog.Description className="mb-4 text-gray-600">
            Редактирай името на склада.
          </Dialog.Description>

          <div>
            <EditStorageForm name={name} id={storageId} />
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

export default EditBtn;
