import Link from "next/link";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/16/solid";
import { useTranslation } from "../i18n/index";
import { Params } from "@/db/interfaces/params";
import Image from "next/image";
import ScreenBtn from "@/components/home/screen-btn";

export default async function Home({ params: { lng } }: Params) {
  localStorage.setItem("lng", lng);
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-center rounded-lg p-4 justify-between  bg-red-600 md:h-24">
        <Image
          src="/media/white-logo.png"
          width={200}
          height={200}
          className="hidden md:block"
          alt="Logo"
        />
        <Image
          src="/media/white-logo.png"
          width={150}
          height={150}
          className="block md:hidden"
          alt="Logo"
        />
        <Link href="/login" className="border-white border-2 rounded-2xl">
          <ArrowLeftEndOnRectangleIcon
            color="white"
            className="h-16 w-16 right-0 "
          />
        </Link>
      </div>
      <div className="mt-20">
        <div className="md:flex justify-around">
          <div className="flex flex-col items-center w-full">
            <ScreenBtn title="Заскладяване" transaction />
            <ScreenBtn title="Изписване" transaction />
            <ScreenBtn title="Разместване" transaction />
          </div>
          <div className="flex flex-col items-center w-full">
            <ScreenBtn title="Справка и редакция" />
            <ScreenBtn title="Ръчно етикиране" />
            <ScreenBtn title="История операции" />
          </div>
        </div>
      </div>
    </main>
  );
}
