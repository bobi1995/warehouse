import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon } from "@heroicons/react/16/solid";
import CellMatrix from "./cell-matrix";

interface CellBtnProps {
  shelves: number;
  columns: number;
  name: string;
}

const CellBtn: React.FC<CellBtnProps> = ({ shelves, columns, name }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex  m-auto px-4 py-2 bg-main-100 text-white rounded  hover:bg-main-200">
          Виж
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg max-w-2xl w-full p-6">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Стелаж {name}
          </Dialog.Title>
          <Dialog.Description className="mb-4 text-gray-600">
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>
          <CellMatrix columns={columns} shelves={shelves} />
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button className="Button green">Save changes</button>
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

export default CellBtn;
