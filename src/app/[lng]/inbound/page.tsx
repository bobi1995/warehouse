import getMaterials from "@/lib/material/read";
import React from "react";
import { Params } from "@/db/interfaces/params";
import PageBackComponent from "@/components/general/page_back";
import MainClientComponent from "@/components/inbound/main-client-component";
import getStillages from "@/lib/stillage/read";
import { Material, Stillage, Storage } from "@/db/interfaces/types";
import getStorages from "@/lib/storage/read";
import { auth } from "@/auth/auth";

const InboundPage = async ({ params, searchParams }: Params) => {
  const materials = (await getMaterials()) as Material[];
  const stillages = (await getStillages()) as Stillage[];
  const storages = (await getStorages()) as Storage[];
  const session = await auth();

  return (
    <>
      <PageBackComponent />
      <MainClientComponent
        materials={materials}
        stillages={stillages}
        storages={storages}
        email={session?.user?.email ?? ""}
      />
    </>
  );
};

export default InboundPage;
