import { Material } from "@/db/interfaces/types";
import Image from "next/image";
import React from "react";
import MetalForm3D from "../general/3d/metal-3d";

const MaterialDetails = ({ material }: { material: Material }) => {
  const getShape = (shape: string) => {
    switch (shape) {
      case "sheet":
        return "Лист";
      case "circle":
        return "Кръг";
      case "bar":
        return "Профил";
      case "cylinder":
        return "Плътна тръба";
    }
  };
  return (
    <div className="border border-gray-200 rounded-lg shadow-md bg-white p-4 w-1/2">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Информация за материала
      </h2>
      <div className=" items-center">
        <div className="w-full  mt-4 ">
          <div className="p-4 rounded-md">
            <div className="flex justify-around">
              <p className="mb-4">
                <strong>Код (Лесто):</strong> {material.lesto_code}
              </p>
              <p className="mb-4">
                <strong>Описание:</strong>{" "}
                {material.desc ? material.desc : "Няма описание"}
              </p>
              <p className="mb-4">
                <strong>Вид:</strong> {material.type}
              </p>
            </div>
            <div className="flex justify-around">
              <p className="mb-4">
                <strong>Форма:</strong> {getShape(material.shape)}
              </p>
              <p className="mb-4">
                <strong>Размери (мм):</strong>{" "}
                {material.diameter
                  ? `⌀${material.diameter}x${material.size_height ?? ""}`
                  : `${material.size_height}x${material.size_width}x${material.size_length}`}
              </p>
              <p className="mb-4">
                <strong>Тегло:</strong>{" "}
                {material.weight
                  ? `${material.weight.toFixed(2)} кг`
                  : "Няма тегло"}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-full">
          <Image
            src={`/media/parts/${material.shape}-text.jpg`}
            alt="Metal sheet dimensions illustration"
            className="rounded-md"
            width={800}
            height={600}
          />
          {/* <MetalForm3D
            shape={material.shape}
            diameter={material.diameter ?? undefined}
            thickness={material.size_height ?? undefined}
            length={material.size_length ?? undefined}
            width={material.weight ?? undefined}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default MaterialDetails;
