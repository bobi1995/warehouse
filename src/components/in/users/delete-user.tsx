"use client";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { useTranslation } from "@/app/i18n";
import { usePathname } from "next/navigation";
import { deleteUser } from "@/lib/actions/userAction";
import { useRouter } from "next/navigation";

const DeleteUser = ({ id, username }: { id: string; username: string }) => {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const lng = pathname.split("/")[1];
  const router = useRouter();

  const [t, setT] = useState<any>(null);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShow(false);
    }
  };

  const handleUserDelete = async () => {
    await deleteUser(id);
    router.refresh();
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
      <XCircleIcon
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
              <p>
                {t("delete_question")} <b>{username}</b>
              </p>

              <br />
              <div className="gap-4 flex">
                <button
                  type="button"
                  className="bg-btn_green-normal text-white p-2 w-24 hover:bg-btn_green-hover"
                  onClick={handleUserDelete}
                >
                  {t("delete")}
                </button>

                <button
                  type="button"
                  className="bg-btn_red-normal text-white p-2  w-24 hover:bg-btn_red-hover"
                  onClick={() => setShow(false)}
                >
                  {t("close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteUser;
