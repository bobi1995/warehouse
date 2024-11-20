"use client";
import { useRef } from "react";
import InputField from "../material/new/input-field";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { createUser } from "@/lib/userActions/userAction";
import { getErrorMessage } from "@/db/error-messages";
const CreateUser = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    try {
      await createUser(formData);
      toast.success(`Успешно създадохте потребител`);
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error: any) {
      toast.error(getErrorMessage(error.message));
    }
  };
  return (
    <div className="flex flex-col items-center mt-5  mb-10 ">
      <form
        ref={formRef}
        action={handleAction}
        className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8"
      >
        <div className="flex mb-3 items-center w-full">
          <label
            className="w-48 mb-3 mt-5 block text-md font-medium text-gray-900 "
            htmlFor="admin"
          >
            Администратор:
          </label>
          <select
            className="ml-1 h-12 block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
            id="admin"
            name="admin"
            required
          >
            <option value="No">Не</option>
            <option value="Yes">Да</option>
          </select>
        </div>
        <InputField
          inputType="text"
          id="username"
          label="Потребителско име:"
          placeholder="emp..."
          required={true}
        />
        <InputField
          inputType="text"
          id="name"
          label="Име:"
          placeholder="Име на потребителя"
          required={true}
        />
        <InputField
          inputType="text"
          id="email"
          label="Имейл:"
          placeholder="Имейл адрес"
          required={false}
        />
        <InputField
          inputType="password"
          id="password"
          label="Парола:"
          placeholder="Парола за влизане"
          required={true}
        />
        <button
          type="submit"
          className="mt-5 flex items-center bg-btn_green-normal text-white text-xl p-2  rounded-md hover:bg-btn_green-hover"
        >
          <PlusCircleIcon className="w-6 h-6" />
          Добави
        </button>{" "}
      </form>{" "}
    </div>
  );
};

export default CreateUser;
