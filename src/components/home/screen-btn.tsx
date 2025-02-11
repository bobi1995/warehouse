import React from "react";
import clsx from "clsx";
import Link from "next/link";

interface StyledBtnProps {
  title: string;
  transaction?: boolean;
  href: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const ScreenBtn: React.FC<StyledBtnProps> = ({
  title,
  transaction = false,
  href,
  Icon,
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
        <Icon className="w-8 h-8" />
      </div>
      <span className="uppercase">{title}</span>
    </Link>
  );
};

export default ScreenBtn;
