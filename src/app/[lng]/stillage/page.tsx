import PageBackComponent from "@/components/general/page_back";
import CreateStillageForm from "@/components/in/stillage/create-stillage";
import React from "react";
import { Stillage, Storage } from "@/db/interfaces/types";
import getStillages from "@/lib/stillage/read";
import StillageList from "@/components/in/stillage/stillage-list";
import CreateStorage from "@/components/in/stillage/storage/create-storage";
import StorageList from "@/components/in/stillage/storage/storage-list";
import getStorages from "@/lib/storage/read";

const CreateStillagePage = async () => {
  const stillages = (await getStillages()) as Stillage[];
  const storage = (await getStorages()) as Storage[];
  return (
    <div>
      <PageBackComponent />
      <div className="flex justify-center items-center py-10">
        <div className="flex flex-col md:flex-row justify-between items-stretch w-11/12 max-w-9xl space-y-6 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-8 flex flex-col justify-between">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Създай Стелаж
            </h1>
            <CreateStillageForm />
          </div>
          <StillageList stillages={stillages} />
        </div>
      </div>
      <div className="flex justify-center items-center py-10">
        <div className="flex flex-col md:flex-row justify-between items-stretch w-11/12 max-w-9xl space-y-6 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-8 flex flex-col justify-between">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Създай Склад
            </h1>
            <CreateStorage />
          </div>
          <StorageList storages={storage} />
        </div>
      </div>
    </div>
  );
};

export default CreateStillagePage;
