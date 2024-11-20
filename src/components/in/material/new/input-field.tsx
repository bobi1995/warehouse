import React from "react";
interface InputFieldProps {
  inputType: string;
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
  step?: number;
}
const InputField: React.FC<InputFieldProps> = (data) => {
  const { inputType, id, label, placeholder, required, step } = data;
  return (
    <div className="flex mb-3 items-center ">
      <label
        className="w-52 mb-3 mt-5 block text-md font-medium text-gray-900 "
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="ml-1 h-12 peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        step={step}
        type={inputType}
      />
    </div>
  );
};

export default InputField;
