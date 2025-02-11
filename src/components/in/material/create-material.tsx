"use client";
import { useRef } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { createMaterial } from "@/lib/material/action";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/db/error-messages";
import InputField from "./new/input-field";

const CreateMaterial = ({ type }: { type: string }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    try {
      await createMaterial(type, formData);
      toast.success(`Успешно създадохте материал ${name}`);
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error: any) {
      toast.error(getErrorMessage(error.message));
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <form
        ref={formRef}
        action={handleAction}
        className="flex flex-col items-center"
      >
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
            required
          >
            <option value="SS">SS</option>
            <option value="ST">ST</option>
            <option value="ZN">ZN</option>
            <option value="AL">AL</option>
          </select>
        </div>
        <InputField
          inputType="text"
          id="lesto_code"
          label="Лесто код:"
          placeholder="301..."
          required={true}
        />
        <InputField
          inputType="text"
          id="desc"
          label="Описание:"
          placeholder="DC01..."
          required={true}
        />
        {type === "sheet" || type === "bar" || type === "circle" ? (
          <InputField
            inputType="number"
            id="size_height"
            label="Дебелина (мм):"
            placeholder="Дебелина на материала"
            required={true}
            step={0.01}
          />
        ) : null}
        {type === "sheet" || type === "bar" ? (
          <InputField
            inputType="number"
            id="size_width"
            label="Ширина (мм):"
            placeholder="Ширина на материала"
            required={true}
            step={0.01}
          />
        ) : null}
        {type === "sheet" || type === "bar" || type === "cylinder" ? (
          <InputField
            inputType="number"
            id="size_length"
            label="Дължина (мм):"
            placeholder="Дължина на материала"
            required={true}
            step={0.01}
          />
        ) : null}
        {type === "circle" || type === "cylinder" ? (
          <InputField
            inputType="number"
            id="diameter"
            label="Диаметър (мм):"
            placeholder="Диаметър на материала"
            required={true}
            step={0.01}
          />
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
  );
};

export default CreateMaterial;
