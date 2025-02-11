import PageBackComponent from "@/components/general/page_back";
import ChangeStillageBtn from "@/components/inbound/change-stillage-btn";
import ChooseStillage from "@/components/visual/choose-stillage";
import { Stillage } from "@/db/interfaces/types";
import getStillages from "@/lib/stillage/read";
import React from "react";

const LabelingPage = async () => {
  const stillages = (await getStillages()) as Stillage[];

  return (
    <div>
      <PageBackComponent />
      <ChooseStillage stillages={stillages} />
    </div>
  );
};

export default LabelingPage;
