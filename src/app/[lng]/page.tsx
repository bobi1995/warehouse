import { Params } from "@/db/interfaces/params";
import ScreenBtn from "@/components/home/screen-btn";
import { auth } from "@/auth/auth";

export default async function Home({ params: { lng } }: Params) {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col p-6 ">
      <div>
        <div className="md:flex justify-around">
          <div className="flex flex-col items-center w-full">
            <ScreenBtn title="Заскладяване" transaction href="/inbound" />
            <ScreenBtn title="Изписване" transaction href="/outbound" />
            <ScreenBtn title="Разместване" transaction href="/shift" />
            {session ? (
              <ScreenBtn title="Стелажи" transaction href="/stillage" />
            ) : null}
          </div>
          <div className="flex flex-col items-center w-full">
            <ScreenBtn title="Справка и редакция" href="/edit" />
            <ScreenBtn title="Ръчно етикиране" href="/labeling" />
            <ScreenBtn title="История операции" href="/history" />
            {session ? <ScreenBtn title="Материали" href="/material" /> : null}
          </div>
        </div>
      </div>
    </main>
  );
}
