import PageBackComponent from "@/components/general/page_back";
import CreateStillageForm from "@/components/in/create-stillage/create-form";
import React from "react";

const CreateStillagePage = () => {
  return (
    <div>
      <PageBackComponent />
      <h1 className="text-3xl text-center">Създай Стелаж</h1>
      <CreateStillageForm />
    </div>
  );
};

export default CreateStillagePage;
