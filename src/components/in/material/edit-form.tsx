"use client";
import { deleteMaterial, updateMaterial } from "@/lib/material/action";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Material } from "@/db/interfaces/types";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/db/error-messages";

interface EditMaterialFormProps {
  material: Material;
}

const EditMaterialForm: React.FC<EditMaterialFormProps> = ({ material }) => {
  const {
    id,
    lesto_code,
    desc,
    size_height,
    size_length,
    size_width,
    type,
    shape,
    diameter,
  } = material;

  const handleDelete = async () => {
    try {
      await deleteMaterial(id);
      toast.success(`Успешно изтрихте материал ${lesto_code}`);
    } catch (error: any) {
      toast.error(getErrorMessage(error.message));
    }
  };

  const handleAction = async (formData: FormData) => {
    try {
      await updateMaterial(shape, formData, id);
      toast.success(`Успешно създадохте стежаж ${name}`);
    } catch (error: any) {
      toast.error(getErrorMessage(error.message));
    }
  };
  return (
    <>
      <div className="flex flex-col items-center mt-10">
        <form action={handleAction} className="flex flex-col items-center">
          <div className="flex mb-3 items-center w-full">
            <label
              className="w-48 mb-3 mt-5 block text-md font-medium text-gray-900 "
              htmlFor="type"
            >
              Тип (мат.):
            </label>
            <select
              className="ml-1 h-12 peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
              id="type"
              name="type"
              defaultValue={type}
              required
            >
              <option value="SS">SS</option>
              <option value="ST">ST</option>
              <option value="ZN">ZN</option>
              <option value="AL">AL</option>
            </select>
          </div>
          <div className="flex mb-3 items-center">
            <label
              className="w-48 mb-3 mt-5 block text-md font-medium text-gray-900"
              htmlFor="lesto_code"
            >
              Лесто код:
            </label>
            <input
              className="ml-1 h-12 peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
              id="lesto_code"
              name="lesto_code"
              placeholder="301..."
              required
              defaultValue={lesto_code}
              type="text"
            />
          </div>
          <div className="flex mb-3 items-center">
            <label
              className="w-48 mb-3 mt-5 block text-md font-medium text-gray-900"
              htmlFor="desc"
            >
              Описание:
            </label>
            <input
              className="ml-1 h-12 peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
              id="desc"
              name="desc"
              placeholder="DC01..."
              required
              defaultValue={desc ? desc : ""}
              type="text"
            />
          </div>
          {shape === "sheet" || shape === "bar" || shape === "circle" ? (
            <div className="flex mb-3 items-center">
              <label
                className="w-48 mb-3 mt-5 block text-md font-medium text-gray-900"
                htmlFor="size_height"
              >
                Дебелина (мм):
              </label>
              <input
                className="ml-1 h-12 peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                id="size_height"
                name="size_height"
                placeholder="Дебелина на материала"
                step={0.01}
                type="number"
                defaultValue={size_height ? size_height : 0}
              />
            </div>
          ) : null}

          {shape === "sheet" || shape === "bar" ? (
            <div className="flex mb-3 items-center">
              <label
                className="w-48 mb-3 mt-5 block text-md font-medium text-gray-900"
                htmlFor="size_width"
              >
                Ширина (мм):
              </label>
              <input
                className="ml-1 h-12 peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                id="size_width"
                name="size_width"
                placeholder="Брой редове"
                defaultValue={size_width ? size_width : 0}
                step={0.01}
                type="number"
              />
            </div>
          ) : null}
          {shape === "bar" || shape === "sheet" || shape === "cylinder" ? (
            <div className="flex mb-3 items-center ">
              <label
                className="w-48 mb-3 mt-5 block text-md font-medium text-gray-900 "
                htmlFor="size_length"
              >
                Дължина (мм):
              </label>
              <input
                className="ml-1 h-12 peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                id="size_length"
                name="size_length"
                placeholder="Дължина на материала"
                step={0.01}
                type="number"
                defaultValue={size_length ? size_length : 0}
              />
            </div>
          ) : null}

          {shape === "circle" || shape === "cylinder" ? (
            <div className="flex mb-3 items-center ">
              <label
                className="w-48 mb-3 mt-5 block text-md font-medium text-gray-900 "
                htmlFor="diameter"
              >
                Диаметър (мм):
              </label>
              <input
                className="ml-1 h-12 peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                id="diameter"
                name="diameter"
                placeholder="Диаметър на материала"
                step={0.01}
                type="number"
                defaultValue={diameter ? diameter : 0}
              />
            </div>
          ) : null}

          <button
            type="submit"
            className="mt-5 flex items-center bg-btn_green-normal text-white text-xl p-2  rounded-md hover:bg-btn_green-hover"
          >
            <PlusCircleIcon className="w-6 h-6" />
            Запази
          </button>
        </form>
      </div>
      <form action={handleDelete}>
        <button
          className="ml-auto mt-5 flex items-center bg-btn_red-normal text-white text-xl p-2  rounded-md hover:bg-btn_red-hover"
          type="submit"
        >
          <TrashIcon className="w-6 h-6" />
          Изтрий
        </button>
      </form>
    </>
  );
};

export default EditMaterialForm;
