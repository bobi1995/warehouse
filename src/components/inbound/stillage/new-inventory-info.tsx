import { Material } from "@/db/interfaces/types";
import React from "react";

interface NewInventoryInfoProps {
  material: Material;
  formData: {
    plavka: string;
    nPorchka: string;
    comment: string;
    broyBezOtk: string;
    broySOtk: string;
  };
}

const NewInventoryInfo: React.FC<NewInventoryInfoProps> = ({
  material,
  formData,
}) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md space-y-2 w-full mt-5">
      <div className="flex justify-around">
        <div>
          <p className="text-lg font-semibold text-gray-700">
            Материал: <span className="font-normal">{material.lesto_code}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Описание: <span className="font-normal">{material.desc}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Плавка: <span className="font-normal">{formData.plavka}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Поръчка: <span className="font-normal">{formData.nPorchka}</span>
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-700">
            Брой без отклонение:{" "}
            <span className="font-normal">{formData.broyBezOtk}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Брой с отклонение:{" "}
            <span className="font-normal">{formData.broySOtk}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Общо тегло:{" "}
            <span className="font-normal">
              {material.weight &&
                (parseInt(formData.broyBezOtk) + parseInt(formData.broySOtk)) *
                  material.weight}
            </span>
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Коментар: <span className="font-normal">{formData.comment}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewInventoryInfo;
