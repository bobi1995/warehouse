import { InboxArrowDownIcon } from "@heroicons/react/24/solid";
import React from "react";
import clsx from "clsx";
import Link from "next/link";

interface StyledBtnProps {
  title: string;
  transaction?: boolean;
  href: string;
}

const ScreenBtn: React.FC<StyledBtnProps> = ({
  title,
  transaction = false,
  href,
}) => {
  return (
    <Link
      className={clsx(
        " p-6 w-96 h-1/3 text-2xl flex justify-center gap-4 mt-20",
        "clip-trapezoid",
        {
          "bg-main-100 text-white": transaction,
          "bg-white text-main-100 ": !transaction,
        }
      )}
      href={href}
    >
      <div className="">
        <InboxArrowDownIcon className="w-8 h-8" />
      </div>
      <span className="uppercase">{title}</span>
    </Link>
  );
};

export default ScreenBtn;
