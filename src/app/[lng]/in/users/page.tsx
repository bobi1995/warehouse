import React from "react";
import { useTranslation } from "@/app/i18n";
import { Params } from "@/db/interfaces/params";
import { auth } from "@/auth/auth";

const UsersPage = async ({ params: { lng } }: Params) => {
  const { t } = await useTranslation(lng, "emp");
  const session = await auth();

  return <div>{t("username")}</div>;
};

export default UsersPage;
