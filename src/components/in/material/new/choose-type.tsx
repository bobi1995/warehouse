import Image from "next/image";
import React from "react";

interface ChooseTypeProps {
  setPic: React.Dispatch<React.SetStateAction<string>>;
}

const ChooseType: React.FC<ChooseTypeProps> = ({ setPic }) => {
  return (
    <div>
      <p className="text-lg mb-4 text-center">
        Как изглежда материалът, който въвеждате?
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 justify-items-center">
        <div className="cursor-pointer hover:shadow-lg shadow-md rounded-lg p-4">
          <Image
            src="/media/parts/sheet.jpg"
            width={400}
            height={400}
            alt="Metal sheet dimensions illustration"
            className="max-w-full h-auto"
            onClick={() => setPic("sheet")}
          />
        </div>
        <div className="cursor-pointer hover:shadow-lg shadow-md rounded-lg p-4">
          <Image
            src="/media/parts/bar.jpg"
            width={400}
            height={400}
            alt="Metal sheet dimensions illustration"
            className="max-w-full h-auto"
            onClick={() => setPic("bar")}
          />
        </div>
        <div className="cursor-pointer hover:shadow-lg shadow-md rounded-lg p-4">
          <Image
            src="/media/parts/circle.jpg"
            width={400}
            height={400}
            alt="Metal sheet dimensions illustration"
            className="max-w-full h-auto"
            onClick={() => setPic("circle")}
          />
        </div>
        <div className="cursor-pointer hover:shadow-lg shadow-md rounded-lg p-4">
          <Image
            src="/media/parts/cylinder.jpg"
            width={400}
            height={400}
            alt="Metal sheet dimensions illustration"
            className="max-w-full h-auto"
            onClick={() => setPic("cylinder")}
          />
        </div>
      </div>
    </div>
  );
};

export default ChooseType;
