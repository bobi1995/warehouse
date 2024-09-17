import React from "react";
import LoginForm from "@/components/login/login-form";
import Image from "next/image";
import { Params } from "@/db/interfaces/params";

const LoginPage = ({ params: { lng } }: Params) => {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-center rounded-lg bg-main-100 p-3 md:h-36">
          <Image
            src="/media/white-logo.png"
            width={150}
            height={150}
            className="m-auto"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
        <LoginForm lng={lng} />
      </div>
    </main>
  );
};

export default LoginPage;
