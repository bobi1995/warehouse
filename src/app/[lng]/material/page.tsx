import PageBackComponent from "@/components/general/page_back";
import CreateMaterial from "@/components/in/material/create-material";
import Image from "next/image";
import React from "react";

const MaterialPage = () => {
  return (
    <div>
      <PageBackComponent />
      <div className="flex justify-center items-center py-10">
        <div className="flex flex-col md:flex-row justify-between items-stretch w-11/12 max-w-9xl space-y-6 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-8 flex flex-col justify-between">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Създай Материал
            </h1>
            <CreateMaterial />
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center bg-white shadow-lg rounded-lg">
            <Image
              src="/media/metal-sheet.jpg"
              width={1000}
              height={800}
              alt="Metal sheet dimensions illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialPage;
