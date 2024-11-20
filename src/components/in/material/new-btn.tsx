"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  XMarkIcon,
  Squares2X2Icon,
  ArrowLeftCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import ChooseType from "./new/choose-type";
import CreateMaterial from "./create-material";
import Image from "next/image";

const NewMaterialBtn = () => {
  const [pic, setPic] = useState("");

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      setPic("");
    }
  };

  return (
    <Dialog.Root onOpenChange={handleDialogChange}>
      <Dialog.Trigger asChild>
        <button className="flex mt-10  m-auto px-4 py-2 bg-main-100 text-white rounded  hover:bg-main-200">
          <PlusCircleIcon className="w-6 h-6" /> Добави
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed grid inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="max-h-[90vh] overflow-y-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg w-11/12 p-6">
          <Dialog.Title className="text-lg font-semibold mb-4 text-center flex items-center justify-center space-x-3">
            {pic ? (
              <ArrowLeftCircleIcon
                className="h-8 w-8 text-main-100 hover:text-main-200 cursor-pointer absolute left-4"
                onClick={() => setPic("")}
              />
            ) : null}
            <span className="flex-1">
              {pic ? "Създай материал" : "Избери тип"}
            </span>
          </Dialog.Title>

          {pic ? (
            <div className="flex flex-col md:flex-row justify-between items-stretch w-full max-w-9xl space-y-6 md:space-y-0 md:space-x-8">
              <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-8 flex flex-col justify-between">
                <CreateMaterial type={pic} />
              </div>

              <div className="w-full md:w-1/2 flex justify-center items-center bg-white shadow-lg rounded-lg">
                <Image
                  src={`/media/parts/${pic}-text.jpg`}
                  width={1000}
                  height={800}
                  alt="Metal sheet dimensions illustration"
                />
              </div>
            </div>
          ) : (
            <ChooseType setPic={setPic} />
          )}
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

export default NewMaterialBtn;
