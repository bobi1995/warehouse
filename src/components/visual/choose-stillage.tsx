"use client";
import React, { useState } from "react";
import ChangeStillageBtn from "../inbound/change-stillage-btn";
import { Stillage } from "@/db/interfaces/types";
import Stillage3D from "@/components/general/stillage-3d";
import StillageDisplay from "./stillage-display";

interface ChangeStillageBtnProps {
  stillages: Stillage[];
}

const ChooseStillage: React.FC<ChangeStillageBtnProps> = ({ stillages }) => {
  const [stillage, setStillage] = useState<Stillage | undefined>(undefined);
  return (
    <div>
      {stillage ? (
        <StillageDisplay stillage={stillage} setStillage={setStillage} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
          {stillages.map((stillage) => {
            return (
              <div className="w-full text-center" key={stillage.id}>
                <button
                  className="font-bold text-xl bg-green-500 px-4 py-1 border-2 border-green-500 rounded-lg w-28 text-white hover:bg-white hover:text-green-500"
                  onClick={() => setStillage(stillage)}
                >
                  {stillage.name}
                </button>
                <div>
                  <Stillage3D
                    rows={stillage.shelves}
                    columns={stillage.columns}
                    selectedCell={{
                      code: "A-0",
                      id: 0,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChooseStillage;
