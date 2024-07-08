"use client";

import { HomeIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { LanguageIcon } from "@heroicons/react/24/outline";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { en_name: "Home", bg_name: "Начало", href: "/in", icon: HomeIcon },
  {
    en_name: "Users",
    bg_name: "Потребители",
    href: "/in/users",
    icon: DocumentDuplicateIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  const lng = pathname.split("/")[1];

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const linkName = lng === "bg" ? link.bg_name : link.en_name;

        return (
          <Link
            key={link.href}
            href={`/${lng}${link.href}`}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-main-100 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-main-100": pathname === `/${lng}${link.href}`,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{linkName}</p>
          </Link>
        );
      })}
    </>
  );
}
