import { Params } from "@/db/interfaces/params";
import ScreenBtn from "@/components/home/screen-btn";
import { auth } from "@/auth/auth";
import {
  InboxArrowDownIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  ArrowsUpDownIcon,
  InboxStackIcon,
  PencilSquareIcon,
  ClipboardDocumentCheckIcon,
  EyeIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/solid";

export default async function Home({ params: { lng } }: Params) {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col p-6 ">
      <div>
        <div className="md:flex justify-around">
          <div className="flex flex-col items-center w-full">
            <ScreenBtn
              title="Заскладяване"
              transaction
              href="/inbound"
              Icon={ArrowDownTrayIcon}
            />
            <ScreenBtn
              title="Изписване"
              transaction
              href="/outbound"
              Icon={ArrowUpTrayIcon}
            />
            <ScreenBtn
              title="Разместване"
              transaction
              href="/shift"
              Icon={ArrowsUpDownIcon}
            />
            {session ? (
              <ScreenBtn
                title="Стелажи"
                transaction
                href="/stillage"
                Icon={InboxStackIcon}
              />
            ) : null}
          </div>
          <div className="flex flex-col items-center w-full">
            <ScreenBtn
              title="Справка и редакция"
              href="/reference"
              Icon={PencilSquareIcon}
            />
            <ScreenBtn
              title="Ръчно етикиране"
              href="/labeling"
              Icon={EyeIcon}
            />
            <ScreenBtn
              title="История операции"
              href="/history"
              Icon={ClipboardDocumentCheckIcon}
            />
            {session ? (
              <ScreenBtn
                title="Материали"
                href="/material"
                Icon={Square3Stack3DIcon}
              />
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
