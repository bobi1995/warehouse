import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { useTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";

export const LangSwitcher = async ({ lng }: { lng: string }) => {
  const { t } = await useTranslation(lng, "switcher");

  return (
    <div>
      <Trans i18nKey="text" t={t}>
        Switch from to:
      </Trans>
      {languages
        .filter((l) => lng !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {index > 0 && " or "}
              <Link href={`/${l}`}>{l}</Link>
            </span>
          );
        })}
    </div>
  );
};
