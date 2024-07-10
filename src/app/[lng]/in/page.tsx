import { Params } from "@/db/interfaces/params";
import { useTranslation } from "../../i18n/index";
import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";

export default async function Home({ params: { lng } }: Params) {
  const { t } = await useTranslation(lng);
  const session = await auth();

  if (!session || !session.user) {
    return redirect("/login");
  }
  return <div>HomePage</div>;
}
