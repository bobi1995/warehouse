"use client";
import { usePathname } from "next/navigation";
import {
  PencilSquareIcon,
  UserCircleIcon,
  KeyIcon,
  AtSymbolIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { useTranslation } from "@/app/i18n";
import { updateUser } from "@/lib/userActions/userAction";
import { useRouter } from "next/navigation";

interface UserEditInterface {
  username: string;
  password: string;
  email: string | null;
  name: string | null;
  id: string;
}

const EditUser = ({ user }: { user: UserEditInterface }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const router = useRouter();
  const pathname = usePathname();
  const lng = pathname.split("/")[1];

  const [t, setT] = useState<any>(null);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShow(false);
    }
  };

  const handleUserUpdate = async () => {
    await updateUser({
      id: user.id,
      email: email ? email : "",
      username,
      name: name ? name : "",
    });
    router.refresh();
    setShow(false);
  };

  useEffect(() => {
    async function fetchTranslation() {
      const { t } = await useTranslation(lng, "user");
      setT(() => t);
    }
    fetchTranslation();
  }, [lng]);

  return (
    <>
      <PencilSquareIcon
        className="w-6 hover:cursor-pointer"
        onClick={() => setShow(true)}
      />
      {show && (
        <div
          className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center"
          onClick={handleBackdropClick}
        >
          <div className="bg-white m-auto p-8">
            <div className="flex flex-col items-center">
              <p>{t("editUser")}</p>

              <form>
                <div>
                  <label
                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                    htmlFor="username"
                  >
                    {t("username")}
                  </label>
                  <div className="relative">
                    <input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      id="username"
                      name="username"
                      placeholder={t("username_placeholder")}
                      required
                      defaultValue={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
                </div>
                {/* <div className="mt-4">
                  <label
                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                    htmlFor="password"
                  >
                    {t("password")}
                  </label>
                  <div className="relative">
                    <input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      id="password"
                      type="password"
                      name="password"
                      placeholder={t("password_placeholder")}
                      required
                      minLength={6}
                      defaultValue={user.password}
                    />
                    <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
                </div> */}

                <div>
                  <label
                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                    htmlFor="email"
                  >
                    {t("email")}
                  </label>
                  <div className="relative">
                    <input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      id="email"
                      name="email"
                      placeholder={t("email_placeholder")}
                      required
                      defaultValue={email ? email : ""}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
                </div>

                <div>
                  <label
                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    {t("name")}
                  </label>
                  <div className="relative">
                    <input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      id="name"
                      name="name"
                      placeholder={t("name_placeholder")}
                      required
                      defaultValue={name ? name : ""}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <ChatBubbleBottomCenterIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
                </div>
              </form>
              <br />
              <div className="gap-4 flex">
                <button
                  type="button"
                  className="bg-btn_green-normal text-white p-2 w-24 hover:bg-btn_green-hover"
                  onClick={handleUserUpdate}
                >
                  Запази
                </button>

                <button
                  type="button"
                  className="bg-btn_red-normal text-white p-2  w-24 hover:bg-btn_red-hover"
                  onClick={() => setShow(false)}
                >
                  Затвори
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default EditUser;
