import React from "react";
import { getCountQueryUsers, getUsers } from "@/lib/userActions/userAction";
import EditUser from "./edit-user";
import { useTranslation } from "@/app/i18n";
import DeleteUser from "./delete-user";
import SearchUser from "./search-user";
import Pagination from "./pagination";
const UserTable = async ({
  lng,
  query,
  currentPage,
}: {
  lng: string;
  query: string;
  currentPage: number;
}) => {
  const users = await getUsers(query, currentPage);
  const usersCount = await getCountQueryUsers(query);
  const { t } = await useTranslation(lng, "user");
  return (
    <>
      <SearchUser placeholder="" />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse shadow-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border text-left py-2 px-3 uppercase font-semibold text-sm">
                {t("username")}
              </th>
              <th className="border text-left py-2 px-3 uppercase font-semibold text-sm">
                {t("name")}
              </th>
              <th className="border text-left py-2 px-3 uppercase font-semibold text-sm">
                {t("email")}
              </th>
              <th className="border text-left py-2 px-3 uppercase font-semibold text-sm">
                {t("createdAt")}
              </th>
              <th className="border text-left py-2 px-3 uppercase font-semibold text-sm">
                {t("edit")}
              </th>
              <th className="border text-left py-2 px-3 uppercase font-semibold text-sm">
                {t("delete")}
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="bg-gray-100">
                <td className="border py-2 px-3">{user.username}</td>
                <td className="border py-2 px-3">{user.name}</td>
                <td className="border py-2 px-3">{user.email}</td>
                <td className="border py-2 px-3">
                  {new Date(user.createdAt).toDateString()}
                </td>
                <td className="border py-2 px-3">
                  <EditUser
                    user={{
                      id: user.id,
                      username: user.username,
                      password: user.password,
                      email: user.email,
                      name: user.name,
                    }}
                  />
                </td>
                <td>
                  <DeleteUser id={user.id} username={user.username} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination totalPages={usersCount} />
    </>
  );
};

export default UserTable;
