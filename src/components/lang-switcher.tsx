"use client";
import ReactFlagsSelect from "react-flags-select";
import { languages } from "@/app/i18n/settings";
import { usePathname, useRouter } from "next/navigation";

const flagMap: { [key: string]: string } = {
  en: "GB",
  bg: "BG",
};

export const LangSwitcher = () => {
  const pathname = usePathname();
  const lng = pathname.split("/")[1];
  const router = useRouter();

  const handleLanguageChange = (selectedCountryCode: string) => {
    const selectedLanguage = Object.keys(flagMap).find(
      (key) => flagMap[key] === selectedCountryCode
    );
    if (selectedLanguage) {
      const newPath = pathname.replace(`/${lng}`, `/${selectedLanguage}`);
      localStorage.setItem("lng", selectedLanguage);
      router.push(newPath);
    }
  };
  return (
    <div className="relative inline-block">
      <ReactFlagsSelect
        selected={flagMap[lng]}
        countries={Object.values(flagMap)}
        customLabels={Object.fromEntries(
          Object.entries(flagMap).map(([key, value]) => [value, key])
        )}
        onSelect={handleLanguageChange}
        className="z-50"
      />
    </div>
  );
};
