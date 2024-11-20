"use client";
import { useState } from "react";
import MaterialForm from "./material-form";
import StillageComponent from "./stillage";
import { Material, Stillage, Storage } from "@/db/interfaces/types";
import MaterialDetails from "./material-details";
import InboundForm from "./inbound-form";
import ChangeStorageBtn from "./change-storage-btn";
const MainClientComponent = ({
  materials,
  stillages,
  storages,
  email,
}: {
  materials: Material[];
  stillages: Stillage[];
  storages: Storage[];
  email: string;
}) => {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null
  );
  const [stillage, setStillage] = useState<Stillage | null>(null);
  const [formData, setFormData] = useState({
    plavka: "",
    nPorchka: "",
    comment: "",
    broyBezOtk: "",
    broySOtk: "",
    receiveDate: new Date(),
    storageDate: new Date(),
  });

  return (
    <div>
      <div className="p-3 w-full">
        <div className="w-full">
          <MaterialForm
            materials={materials}
            setSelectedMaterial={setSelectedMaterial}
            setStillage={setStillage}
          />
          {selectedMaterial && (
            <div className="flex w-full gap-16 mt-10">
              <MaterialDetails material={selectedMaterial} />
              <InboundForm
                material={selectedMaterial}
                setStillage={setStillage}
                setFormData={setFormData}
                stillages={stillages}
              />
            </div>
          )}
        </div>
        {selectedMaterial ? (
          <div className="h-screen mt-20">
            {stillage && (
              <StillageComponent
                stillage={stillage}
                formData={formData}
                material={selectedMaterial}
                stillages={stillages}
                setStillage={setStillage}
                setSelectedMaterial={setSelectedMaterial}
                storages={storages}
                email={email}
              />
            )}
            {storages.length > 0 && !stillage && formData.nPorchka && (
              <div className="flex justify-center">
                <ChangeStorageBtn
                  storages={storages}
                  inventory={{
                    quan_dev: parseInt(formData.broySOtk),
                    quan_ok: parseInt(formData.broyBezOtk),
                    materialId: selectedMaterial.id,
                    lot: formData.plavka,
                    order: formData.nPorchka,
                    comment: formData.comment,
                    deliveryDate: formData.receiveDate,
                    inboundDate: formData.storageDate,
                  }}
                  setMaterial={setSelectedMaterial}
                />
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MainClientComponent;
