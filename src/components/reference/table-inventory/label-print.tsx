"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon, PrinterIcon } from "@heroicons/react/24/solid";
import { Inventory } from "@/db/interfaces/types";
import printLabel from "@/utils/printLabel";
import labelBody from "@/db/label-body";

const LabelPrint = ({ data }: { data: Inventory }) => {
  const handlePrint = async () => {
    await printLabel(
      labelBody(
        data.material?.lesto_code,
        data.material?.desc,
        data.order,
        data.lot,
        data.deliveryDate.toDateString(),
        (data.quan_dev + data.quan_ok).toString(),
        data.comment || "",
        data.id.toString()
      )
    );
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <PrinterIcon className="w-5 h-5 hover:cursor-pointer" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed grid inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="max-h-[90vh] overflow-y-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg  p-6">
          <Dialog.Title className="text-lg font-semibold mb-4 text-center flex items-center justify-center space-x-3">
            Принтирай етикет
          </Dialog.Title>
          <Dialog.Description className="mb-4 text-gray-600">
            Принтирай етикет за материал с код: {data.material?.lesto_code} и
            плавка: {data.lot}
          </Dialog.Description>
          <div>
            <div className="flex justify-center mt-10">
              <button
                className="bg-blue-500 text-white rounded-md p-2"
                onClick={handlePrint}
              >
                Потвърди
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

export default LabelPrint;
