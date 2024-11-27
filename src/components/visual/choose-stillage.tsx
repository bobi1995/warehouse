"use client";
import React, { useState } from "react";
import ChangeStillageBtn from "../inbound/change-stillage-btn";
import { Stillage } from "@/db/interfaces/types";
import Stillage3D from "@/components/general/stillage-3d";

interface ChangeStillageBtnProps {
  stillages: Stillage[];
}

const ChooseStillage: React.FC<ChangeStillageBtnProps> = ({ stillages }) => {
  const [stillage, setStillage] = useState<Stillage | undefined>(undefined);
  return (
    <div>
      <ChangeStillageBtn
        stillages={stillages}
        stillage={stillage}
        setStillage={setStillage}
      />
      <div className="flex justify-around gap-1">
        {stillages.map((stillage) => {
          return (
            <div key={stillage.id} className="max-w-1/5 ">
              <Stillage3D
                rows={stillage.shelves}
                columns={stillage.columns}
                selectedCell={{
                  code: "A-0",
                  id: 0,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChooseStillage;
