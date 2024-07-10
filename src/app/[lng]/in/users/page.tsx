import React from "react";
import { useTranslation } from "@/app/i18n";
import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import UserTable from "@/components/in/users/user-table";

interface UserPageParams {
  params: {
    lng: string;
  };
  searchParams?: {
    query?: string;
    page?: string;
  };
}

const UsersPage = async ({ params, searchParams }: UserPageParams) => {
  const { t } = await useTranslation(params.lng, "emp");
  const session = await auth();
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  if (!session || !session.user) {
    return redirect("/login");
  }
  return (
    <div>
      <UserTable lng={params.lng} query={query} currentPage={currentPage} />
    </div>
  );
};

export default UsersPage;
