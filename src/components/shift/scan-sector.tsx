"use client";
import Image from "next/image";
import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface ScannedProps {}

const ScanSector: React.FC<ScannedProps> = () => {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const { replace } = useRouter();

  const barcodeRead = (id: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("inventoryId", id.toString());
    return replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex justify-center gap-24 w-full px-1">
        <div className="border-4 border-red-500 rounded-lg p-4">
          <Image
            src="/media/barcode/scan.jpg"
            width={300}
            height={300}
            className="hidden md:block"
            alt="Logo"
          />
        </div>

        <div className="flex justify-center items-center">
          <div>
            <p className="text-xl font-medium text-gray-800 w-96">
              Изчаква се сканиране на баркод...
            </p>
            <input
              className="w-96 h-12 mt-4 rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
              type="text"
              placeholder="Сканирай тук..."
              onChange={(e) => barcodeRead(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanSector;
