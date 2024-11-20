import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";
import { auth, signOut } from "@/auth/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sheet Metal Warehouse",
  description: "Created by Borislav Stefanov",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-fullscreen`}>
        <ToastContainer />
        <div className="m-3 flex h-20 shrink-0 items-center rounded-lg p-4 justify-between  bg-main-100 md:h-24">
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
          {session ? (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button className="border-white border-2 rounded-2xl flex">
                <ArrowLeftEndOnRectangleIcon
                  color="white"
                  className="h-10 w-10 right-0 "
                />
                <p className="text-white text-3xl px-3">Излез</p>
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="border-white border-2 rounded-2xl flex"
            >
              <ArrowRightEndOnRectangleIcon
                color="white"
                className="h-10 w-10 right-0 "
              />
              <p className="text-white text-3xl px-3">Влез</p>
            </Link>
          )}
        </div>
        {children}
      </body>
    </html>
  );
}
