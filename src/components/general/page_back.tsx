"use client";
import { useRouter } from "next/navigation";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const PageBackComponent = () => {
  const router = useRouter();
  return (
    <Link
      className="bg-main-100 text-xl p-2 text-white rounded-md flex items-center justify-center m-auto my-5 w-28"
      href={"/"}
    >
      <ArrowLeftCircleIcon className="w-6 h-6" />
      Назад
    </Link>
  );
};

export default PageBackComponent;
