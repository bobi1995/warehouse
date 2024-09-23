import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import CellMatrix from "./cell-matrix";
import { Cell } from "@/db/interfaces/types";

interface CellBtnProps {
  shelves: number;
  columns: number;
  name: string;
  stillageId: number;
  cells: Cell[];
}

const CellBtn: React.FC<CellBtnProps> = ({
  shelves,
  columns,
  name,
  stillageId,
  cells,
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex  m-auto px-4 py-2 bg-main-100 text-white rounded  hover:bg-main-200">
          <Squares2X2Icon className="w-6 h-6" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed grid inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="max-h-[90vh] overflow-y-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg max-w-2xl w-full p-6">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Стелаж {name}
          </Dialog.Title>
          <Dialog.Description className="mb-4 text-gray-600">
            Редактирайте клетките на стелажа като кликнете върху тях
          </Dialog.Description>
          <div className="flex justify-around mt-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-300"></div>&nbsp;Няма данни
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-200"></div>&nbsp;Има данни
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-200"></div>&nbsp;Избрана клетка
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-200"></div>&nbsp;Изолатор
            </div>
          </div>
          <div className="flex justify-center">
            <CellMatrix
              columns={columns}
              shelves={shelves}
              stillageId={stillageId}
              cells={cells}
            />
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          ></div>
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
