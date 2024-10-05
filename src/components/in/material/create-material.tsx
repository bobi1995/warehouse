"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import ErrorBoundaryWrapper from "@/components/general/error-fallback";
import { createMaterial } from "@/lib/material/action";

const CreateMaterial = () => {
  const [length, setLength] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [type, setType] = useState("SS");
  const [code, setCode] = useState("");

  let maxWeight = 0;
  if (type === "Al") {
    console.log(length, height, width);
    maxWeight = (2.78 * length * height * width) / (1000 * 1000);
  } else {
    maxWeight = (7.9 * length * height * width) / (1000 * 1000);
  }

  const router = useRouter();

  const handleCreate = async () => {
    await createMaterial({
      type,
      size_length: length,
      size_height: height,
      size_width: width,
      weight: maxWeight,
      lesto_code: code,
    });
    router.refresh();
  };

  return (
    <ErrorBoundaryWrapper>
      <div className="flex flex-col items-center mt-10">
        <form action={handleCreate} className="flex flex-col items-center">
          <div className="flex mb-3 items-center w-full">
            <label
              className="w-48 mb-3 mt-5 block text-md font-medium text-gray-900 "
              htmlFor="type"
            >
              Тип (мат.):
            </label>
            <select
              className="ml-1 h-12 block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="SS">SS</option>
              <option value="St">St</option>
              <option value="Zn">Zn</option>
              <option value="Al">Al</option>
            </select>
          </div>
          <div className="flex mb-3 items-center">
            <label
              className="w-48 mb-3 mt-5 block text-md font-medium text-gray-900"
              htmlFor="height"
            >
              Дебелина (мм):
            </label>
            <input
              className="ml-1 h-12 peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
              id="height"
              name="height"
              placeholder="Дебелина на материала"
              required
              step={0.01}
              type="number"
              defaultValue={height}
              onChange={(e) => setHeight(parseFloat(e.target.value))}
            />
          </div>

          <div className="flex mb-3 items-center">
            <label
              className="w-48 mb-3 mt-5 block text-md font-medium text-gray-900"
              htmlFor="width"
            >
              Ширина (мм):
            </label>
            <input
              className="ml-1 h-12 peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
              id="width"
              name="width"
              placeholder="Брой редове"
              required
              step={0.01}
              type="number"
              defaultValue={width}
              onChange={(e) => setWidth(parseFloat(e.target.value))}
            />
          </div>
          <div className="flex mb-3 items-center ">
            <label
              className="w-48 mb-3 mt-5 block text-md font-medium text-gray-900 "
              htmlFor="length"
            >
              Дължина (мм):
            </label>
            <input
              className="ml-1 h-12 peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
              id="length"
              name="length"
              placeholder="Дължина на материала"
              required
              step={0.01}
              type="number"
              defaultValue={length}
              onChange={(e) => setLength(parseFloat(e.target.value))}
            />
          </div>

          <div className="flex mb-3 items-center">
            <label
              className="w-48 mb-3 mt-5 block text-md font-medium text-gray-900"
              htmlFor="width"
            >
              Тегло (кг):
            </label>
            <input
              className="ml-1 h-12 peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
              id="width"
              name="width"
              placeholder="Тегло на материала"
              required
              disabled
              type="number"
              value={maxWeight.toFixed(3)}
            />
          </div>
          <div className="flex mb-3 items-center">
            <label
              className="w-48 mb-3 mt-5 block text-md font-medium text-gray-900"
              htmlFor="code"
            >
              Лесто код:
            </label>
            <input
              className="ml-1 h-12 peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
              id="code"
              name="code"
              placeholder="301..."
              required
              value={code}
              type="text"
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-5 flex items-center bg-btn_green-normal text-white text-xl p-2  rounded-md hover:bg-btn_green-hover"
          >
            <PlusCircleIcon className="w-6 h-6" />
            Запази
          </button>
        </form>
      </div>{" "}
    </ErrorBoundaryWrapper>
  );
};

export default CreateMaterial;
