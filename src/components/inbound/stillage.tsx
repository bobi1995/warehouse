"use client";
import { useState, useEffect } from "react";
import Stillage3D from "@/components/general/stillage-3d";
import { Material, Stillage, Storage } from "@/db/interfaces/types";
import CellMatrix3d from "../general/3d/cell-matrix";
import { createInventory } from "@/lib/inventory/action";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/db/error-messages";
import ChangeStillageBtn from "./change-stillage-btn";
import { suggestCell } from "@/utils/suggestCell";
import NewInventoryInfo from "./stillage/new-inventory-info";
import ChangeStorageBtn from "./change-storage-btn";
import axios from "axios";
import printLabel from "@/utils/printLabel";
import labelBody from "@/db/label-body";

const StillageComponent = ({
  stillage,
  formData,
  material,
  stillages,
  setStillage,
  setSelectedMaterial,
  storages,
  email,
}: {
  stillage: Stillage;
  material: Material;
  email: string;
  formData: {
    plavka: string;
    nPorchka: string;
    comment: string;
    broyBezOtk: string;
    broySOtk: string;
    receiveDate: Date;
    storageDate: Date;
  };
  stillages: Stillage[];
  setStillage: (stillage: Stillage) => void;
  setSelectedMaterial: (material: Material | null) => void;
  storages: Storage[];
}) => {
  const [selectedCell, setSelectedCell] = useState<{
    code: string;
    id: number;
  } | null>(null);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (stillage && stillage.cells && stillage.cells.length > 0) {
      const suggestedCell = suggestCell(stillage.cells, {
        broyBezOtk: parseInt(formData.broyBezOtk),
        broySOtk: parseInt(formData.broySOtk),
        materialWeight: material.weight,
        materialId: material.id,
        thickness: material.size_height,
      });
      if (suggestedCell?.code && suggestedCell.id !== undefined) {
        setSelectedCell({
          code: suggestedCell.code,
          id: suggestedCell.id,
        });
      } else setSelectedCell(null);
    }
  }, [stillage]);

  const handleCreate = async () => {
    if (selectedCell && selectedCell.id && stillage && stillage.id) {
      const otk = parseInt(formData.broySOtk);
      const bezOtk = parseInt(formData.broyBezOtk);
      try {
        const res = await createInventory({
          cellId: selectedCell?.id,
          quan_dev: otk,
          quan_ok: bezOtk,
          stillageId: stillage.id,
          materialId: material.id,
          lot: formData.plavka,
          order: formData.nPorchka,
          comment: formData.comment,
          deliveryDate: formData.receiveDate,
          inboundDate: formData.storageDate,
          email,
        });
        setSelectedMaterial(null);
        await printLabel(
          labelBody(
            material.lesto_code,
            material.desc,
            formData.nPorchka,
            formData.plavka,
            formData.receiveDate.toDateString(),
            (otk + bezOtk).toString(),
            formData.comment,
            res.inventory.id.toString()
          )
        );

        toast.success(
          `Успешно заскладихте материал в клетка ${selectedCell.code} на стелаж ${stillage.name}`
        );
      } catch (error: any) {
        console.log(error.message);
        toast.error(getErrorMessage(error.message));
      }
    }
  };

  if (!stillage) {
    return (
      <div className="w-full h-screen">
        <h1 className="text-2xl font-bold text-center mb-5">
          Няма създадени стелаж за вид материал {material.type}
        </h1>
      </div>
    );
  }

  if (stillage.cells && stillage.cells.length < 1) {
    return (
      <div className="w-full h-screen">
        <h1 className="text-2xl font-bold text-center mb-5">
          Няма създадени клетки в стелаж {stillage.name} за вид материал{" "}
          {material.type}
        </h1>
        <div className="flex justify-center mt-10">
          <ChangeStillageBtn
            stillages={stillages}
            stillage={stillage}
            setStillage={setStillage}
          />
        </div>
      </div>
    );
  }

  if (!selectedCell) {
    return (
      <div className="w-full h-screen text-center">
        <h1 className="text-2xl font-bold text-center mb-5">
          Няма подходяща клетка за тази заявка
        </h1>
        <h2 className="text-gray-500 italic ">
          Може да избере клетка ръчно, но не е строго непропоръчително. Има риск
          от претоварване на стелажи.
        </h2>
        <button
          className="bg-red-500 text-white rounded-md p-2 mt-5 hover:bg-red-700"
          onClick={() => {
            if (stillage.cells && stillage.cells.length > 0) {
              setManual(true);
              setSelectedCell({
                code: stillage.cells[0].code,
                id: stillage.cells[0].id,
              });
            }
          }}
        >
          Избери ръчно
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <h1 className="text-2xl font-bold text-center mb-5">
        {stillage ? `Стелаж ${stillage.name}` : "Няма избран стелаж"}
      </h1>
      <div className="flex w-full gap-16">
        <div className=" justify-between border border-gray-200 rounded-lg shadow-md bg-white p-4 w-1/2">
          {selectedCell && (
            <CellMatrix3d
              shelves={stillage.shelves}
              columns={stillage.columns}
              cells={stillage.cells || []}
              selectedCell={selectedCell}
              setSelectedCell={setSelectedCell}
              stillageId={stillage.id}
              newWeight={
                material.weight &&
                (parseInt(formData.broyBezOtk) + parseInt(formData.broySOtk)) *
                  material.weight
              }
              manual={manual}
            />
          )}
          <NewInventoryInfo material={material} formData={formData} />
        </div>
        <div className="border border-gray-200 rounded-lg shadow-md bg-white p-4 w-1/2">
          <div className="w-full h-full">
            {selectedCell && (
              <Stillage3D
                columns={stillage.columns}
                rows={stillage.shelves}
                selectedCell={selectedCell}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center p-10 gap-8 ">
        <button
          onClick={handleCreate}
          className="w-52 bg-gradient-to-r from-green-300 to-green-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg border border-green-400 hover:from-green-400 hover:to-green-600 hover:shadow-xl transition-all duration-300"
        >
          ЗАСКЛАДИ
        </button>

        <ChangeStillageBtn
          stillages={stillages}
          stillage={stillage}
          setStillage={setStillage}
        />
        {storages.length > 0 && (
          <ChangeStorageBtn
            storages={storages}
            email={email}
            lesto_code = {material.lesto_code}
            desc={ material.desc}
         
            inventory={{
              quan_dev: parseInt(formData.broySOtk),
              quan_ok: parseInt(formData.broyBezOtk),
              materialId: material.id,
              lot: formData.plavka,
              order: formData.nPorchka,
              comment: formData.comment,
              deliveryDate: formData.receiveDate,
              inboundDate: formData.storageDate,
            }}
            setMaterial={setSelectedMaterial}
          />
        )}
      </div>
    </div>
  );
};

export default StillageComponent;
