import React from "react";
import OutbondBtn from "./outbond-btn";

export interface RequestSummaryProps {
  requestedQuantities: {
    [key: string]: {
      quantity: number;
      materialDesc: string;
      lot: string;
      order: string;
      lesto_code: string;
      materialId: number;
    };
  };
  setRequestedQuantities: any;
  email?: string | null;
}

const RequestSummaryTable: React.FC<RequestSummaryProps> = ({
  requestedQuantities,
  setRequestedQuantities,
  email,
}) => {
  return (
    <div className="mb-4 w-11/12 m-auto mt-5">
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Код</th>
            <th className="border px-4 py-2 text-left">Материал</th>
            <th className="border px-4 py-2 text-left">Заяви количество</th>
            <th className="border px-4 py-2 text-left">Плавка</th>
            <th className="border px-4 py-2 text-left">Поръчка</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(requestedQuantities).map(
            ([id, { quantity, materialDesc, lot, order, lesto_code }]) => (
              <tr key={id}>
                <td className="border px-4 py-2">{lesto_code}</td>
                <td className="border px-4 py-2">{materialDesc}</td>
                <td className="border px-4 py-2">{quantity}</td>
                <td className="border px-4 py-2">{lot}</td>
                <td className="border px-4 py-2">{order}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <div className="text-center mt-2">
        <OutbondBtn
          requiredQuantities={requestedQuantities}
          setRequestedQuantities={setRequestedQuantities}
          email={email}
        />
      </div>
    </div>
  );
};

export default RequestSummaryTable;
