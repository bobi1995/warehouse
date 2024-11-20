"use client";
import { useRef, useState } from "react";
import { Material, Stillage } from "@/db/interfaces/types";
import { toast } from "react-toastify";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface InboundFormProps {
  material: Material;
  setStillage: (stillage: Stillage) => void;
  setFormData: (formData: {
    plavka: string;
    nPorchka: string;
    comment: string;
    broyBezOtk: string;
    broySOtk: string;
    receiveDate: Date;
    storageDate: Date;
  }) => void;
  stillages: Stillage[];
}

const InboundForm: React.FC<InboundFormProps> = ({
  material,
  setStillage,
  setFormData,
  stillages,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [receiveDate, setReceiveDate] = useState<Date>(new Date());
  const [storageDate, setStorageDate] = useState<Date>(new Date());
  const [broyBezOtk, setBroyBezOtk] = useState(0);
  const [broySOtk, setBroySOtk] = useState(0);

  const handleIncrement = (fieldName: string) => {
    if (fieldName === "broyBezOtk") {
      setBroyBezOtk((prev) => prev + 1);
    } else if (fieldName === "broySOtk") {
      setBroySOtk((prev) => prev + 1);
    }
  };

  const handleDecrement = (fieldName: string) => {
    if (fieldName === "broyBezOtk") {
      setBroyBezOtk((prev) => Math.max(prev - 1, 0));
    } else if (fieldName === "broySOtk") {
      setBroySOtk((prev) => Math.max(prev - 1, 0));
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const formObject = {
      plavka: formData.get("plavka")?.toString() || "",
      nPorchka: formData.get("nPorchka")?.toString() || "",
      comment: formData.get("comment")?.toString() || "",
      broyBezOtk: broyBezOtk.toString(),
      broySOtk: broySOtk.toString(),
      receiveDate,
      storageDate,
    };

    if (broyBezOtk === 0 && broySOtk === 0) {
      toast.error("Моля въведете брой!");
      return;
    }

    setFormData(formObject);

    const stillage = stillages.find(
      (stillage) => stillage.type === material.type
    );

    if (!stillage) {
      return toast.error("Не е намерен стелаж за този материал!");
    }

    setStillage(stillage);

    // if (formRef.current) {
    //   formRef.current.reset();
    // }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-lg shadow-md w-1/2"
    >
      <div className="flex w-full justify-around">
        <div className="mb-4 min-w-1/3">
          <label className="block text-gray-700" htmlFor="plavka">
            Плавка:
          </label>
          <input
            type="text"
            id="plavka"
            name="plavka"
            className="mt-1 block w-full border border-red-500 rounded-md p-2 focus:outline-none focus:ring focus:ring-red-300"
            placeholder="00000000"
            required
          />
        </div>

        <div className="mb-4 min-w-1/3">
          <label className="block text-gray-700" htmlFor="nPorchka">
            Nº Поръчка:
          </label>
          <input
            type="text"
            id="nPorchka"
            name="nPorchka"
            className="mt-1 block w-full border border-red-500 rounded-md p-2 focus:outline-none focus:ring focus:ring-red-300"
            placeholder="00000000"
            required
          />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row justify-around mt-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-center mb-2">
            Дата на получаване:
          </label>
          <Calendar
            onChange={(date) => setReceiveDate(date as Date)}
            value={receiveDate}
            className="mx-auto"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-center mb-2">
            Дата на заскладяване:
          </label>
          <Calendar
            onChange={(date) => setStorageDate(date as Date)}
            value={storageDate}
            className="mx-auto"
          />
        </div>
      </div>

      <div className="flex justify-around mt-3">
        <div className="w-1/2 items-center">
          <div className="mb-4">
            <label className="block text-gray-700 text-center">
              Брой без отклонение:
            </label>
            <div className="flex items-center justify-center">
              <button
                type="button"
                className="bg-red-500 text-white rounded-md p-2 mr-2"
                onClick={() => handleDecrement("broyBezOtk")}
              >
                −
              </button>
              <input
                type="text"
                name="broyBezOtk"
                value={broyBezOtk}
                readOnly
                className="w-16 text-center border border-gray-300 rounded-md p-2"
              />
              <button
                type="button"
                className={`${
                  broySOtk > 0
                    ? "bg-gray-300 text-gray-500"
                    : "bg-green-500 text-white"
                } rounded-md p-2 ml-2`}
                onClick={() => handleIncrement("broyBezOtk")}
                disabled={broySOtk > 0}
              >
                +
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-center">
              Брой с отклонение:
            </label>
            <div className="flex items-center justify-center">
              <button
                type="button"
                className="bg-red-500 text-white rounded-md p-2 mr-2"
                onClick={() => handleDecrement("broySOtk")}
              >
                −
              </button>
              <input
                type="text"
                name="broySOtk"
                value={broySOtk}
                readOnly
                className="w-16 text-center border border-gray-300 rounded-md p-2"
              />
              <button
                type="button"
                className={`${
                  broyBezOtk > 0
                    ? "bg-gray-300 text-gray-500"
                    : "bg-green-500 text-white"
                } rounded-md p-2 ml-2`}
                onClick={() => handleIncrement("broySOtk")}
                disabled={broyBezOtk > 0}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <textarea
          className="w-1/2 h-32 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Напиши коментар за материала, ако е необходимо..."
          id="comment"
          name="comment"
        ></textarea>
      </div>
      <div className="flex justify-center mt-10">
        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
          Потвърди
        </button>
      </div>
    </form>
  );
};

export default InboundForm;
