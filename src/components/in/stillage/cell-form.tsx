"use client";
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { createCells } from "@/lib/cell/action";
import { useRouter } from "next/navigation";
import ErrorBoundaryWrapper from "@/components/general/error-fallback";

interface CellFormProps {
  selectedCells: { code: string; id?: number }[];
  stillageId: number;
}

const CellForm: React.FC<CellFormProps> = ({ selectedCells, stillageId }) => {
  const [x, setX] = useState(0.1);
  const [y, setY] = useState(0.1);
  const [z, setZ] = useState(0.1);
  const [maxWeight, setMaxWeight] = useState(100);
  const [isolator, setIsolator] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    const cell_arr = selectedCells.map((cell) => ({
      code: cell.code,
      id: cell.id,
      size_length: x,
      size_height: y,
      size_width: z,
      max_weight: maxWeight,
      isolator,
      stillageId,
    }));
    await createCells(cell_arr);
    router.refresh();
  };

  return (
    <ErrorBoundaryWrapper>
      <div className="w-full mt-5">
        <form action={handleCreate} className="flex flex-col items-center">
          <div className="flex  mb-3 mt-3 justify-around w-full">
            <div className="flex items-center">
              <label
                className="w-12  block text-xs font-medium text-gray-900"
                htmlFor="num"
              >
                Брой клетки:
              </label>
              <input
                className="h-12 peer block w-16 rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                id="num"
                name="num"
                placeholder="Избрани клетки..."
                disabled
                type="number"
                value={selectedCells.length}
              />
            </div>
            <div className="flex items-center">
              <label
                className="w-12  block text-xs font-medium text-gray-900"
                htmlFor="weight"
              >
                Тегло (кг):
              </label>
              <input
                className="h-12 peer block w-16 rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                id="weight"
                name="weight"
                placeholder="Тегло..."
                required
                step={100}
                min={100}
                type="number"
                value={maxWeight}
                onChange={(e) => setMaxWeight(parseFloat(e.target.value))}
              />
            </div>

            <div className="flex items-center">
              <label
                className="w-14 block text-xs font-medium text-gray-900"
                htmlFor="isolator"
              >
                Изолатор:
              </label>
              <input
                type="checkbox"
                checked={isolator}
                onChange={() => setIsolator(!isolator)}
                className="scale-150 w-16"
              />
            </div>
          </div>
          <div className="flex  mb-3 mt-3 justify-around w-full">
            <div className="flex items-center ">
              <label
                className="w-12 block text-xs font-medium text-gray-900 "
                htmlFor="width"
              >
                L(м):
              </label>
              <input
                className="h-12 peer block w-16 rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                id="width"
                name="width"
                placeholder="Широчина..."
                required
                type="number"
                step={0.01}
                min={0.1}
                value={x}
                onChange={(e) => setX(parseFloat(e.target.value))}
              />
            </div>
            <div className="flex  items-center">
              <label
                className="w-12 block text-xs font-medium text-gray-900"
                htmlFor="height"
              >
                H(м):
              </label>
              <input
                className="w-16 h-12 peer block  rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                id="height"
                name="height"
                placeholder="Височина..."
                required
                step={0.01}
                min={0.1}
                type="number"
                value={y}
                onChange={(e) => setY(parseFloat(e.target.value))}
              />
            </div>
            <div className="flex items-center">
              <label
                className="w-12  block text-xs font-medium text-gray-900"
                htmlFor="length"
              >
                W(м):
              </label>
              <input
                className="h-12 peer block w-16 rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                id="length"
                name="length"
                placeholder="Дължина"
                required
                step={0.01}
                min={0.1}
                type="number"
                value={z}
                onChange={(e) => setZ(parseFloat(e.target.value))}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-3 flex items-center bg-btn_green-normal text-white text-xl p-2  rounded-md hover:bg-btn_green-hover"
          >
            <PlusCircleIcon className="w-6 h-6" />
            Запази
          </button>
        </form>
      </div>
    </ErrorBoundaryWrapper>
  );
};

export default CellForm;
