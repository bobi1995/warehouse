import PageBackComponent from "@/components/general/page_back";
import CreateMaterial from "@/components/in/material/create-material";
import MaterialsList from "@/components/in/material/materials-list";
import NewMaterialBtn from "@/components/in/material/new-btn";
import { Params } from "@/db/interfaces/params";
import Image from "next/image";
import React from "react";

const MaterialPage = ({ searchParams }: Params) => {
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div>
      <PageBackComponent />
      <NewMaterialBtn />
      <div className="flex justify-center items-center py-10"></div>
      <div className="w-11/12 flex justify-center items-center bg-white shadow-lg rounded-lg m-auto">
        <MaterialsList page={currentPage} />
      </div>
    </div>
  );
};

export default MaterialPage;
