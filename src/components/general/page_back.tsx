"use client";
import { useRouter } from "next/navigation";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

const PageBackComponent = () => {
  const router = useRouter();
  return (
    <button
      className="bg-main-100 text-xl p-2 text-white rounded-md flex items-center justify-center m-auto my-5"
      onClick={() => router.back()}
    >
      <ArrowLeftCircleIcon className="w-6 h-6" />
      Назад
    </button>
  );
};

export default PageBackComponent;
