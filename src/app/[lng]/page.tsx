import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { lusitana } from "@/ui/fonts";
import { useTranslation } from "../i18n/index";
import { Params } from "@/db/interfaces/params";
import { LangSwitcher } from "@/components/lang-switcher";
import Image from "next/image";

export default async function Home({ params: { lng } }: Params) {
  const { t } = await useTranslation(lng);

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-center rounded-lg p-4  bg-main-200 md:h-24">
        <Image
          src="/media/header-logo.png"
          width={200}
          height={200}
          className="hidden md:block"
          alt="Logo"
        />
        <Image
          src="/media/header-logo.png"
          width={150}
          height={150}
          className="block md:hidden"
          alt="Logo"
        />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <LangSwitcher lng={lng} />

          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>Welcome to PayollPro.</strong> This is the example for the{" "}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href={`${lng}/login`}
            className=" flex items-center gap-5 self-start rounded-lg bg-main-100 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>{t("login")}</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/media/main.jpg"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Image for presentation"
          />
          <Image
            src="/media/main.jpg"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Image for presentation"
          />
        </div>
      </div>
    </main>
  );
}
