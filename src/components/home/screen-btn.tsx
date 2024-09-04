import { InboxArrowDownIcon } from "@heroicons/react/24/solid";
import React from "react";
import clsx from "clsx";

interface StyledBtnProps {
  title: string;
  transaction?: boolean;
}

const ScreenBtn: React.FC<StyledBtnProps> = ({
  title,
  transaction = false,
}) => {
  return (
    <button
      className={clsx(
        " p-6 w-96 h-1/3 text-2xl flex justify-center gap-4 mt-20",
        "clip-trapezoid",
        {
          "bg-red-600 text-white": transaction,
          "bg-white text-red-600 ": !transaction,
        }
      )}
    >
      <div className="">
        <InboxArrowDownIcon className="w-8 h-8" />
      </div>
      <span className="uppercase">{title}</span>
    </button>
  );
};

export default ScreenBtn;
