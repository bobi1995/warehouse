"use client";
import { table, thead } from "@/ui/table-style";
import EditMaterial from "./edit-material";
import Pagination from "../users/pagination";
import itemsPerPage from "@/components/general/items-per-page";
import SearchUser from "../users/search-user";
import { useSearchParams } from "next/navigation";
import { Material } from "@/db/interfaces/types";

interface MaterialTableProps {
  materials: Material[];
  page: number;
}
const MaterialTable: React.FC<MaterialTableProps> = ({ materials, page }) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const filteredMaterials = materials.filter(
    (material) =>
      material.lesto_code.includes(query) || material.desc?.includes(query)
  );

  const { data, totalPages } = itemsPerPage(page, filteredMaterials);
  return (
    <div>
      <div className="w-11/12 m-auto">
        <SearchUser placeholder="Търси по код или описание..." />
      </div>
      <table className={`w-11/12 ${table}`}>
        <thead className={thead}>
          <tr>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Код
            </th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Описание
            </th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Материал
            </th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Размери (мм)
            </th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Тегло (кг)
            </th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Редактирай
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((material: Material) => (
            <tr key={material.id}>
              <td className="border px-4 py-4 sm:pl-6">
                {material.lesto_code}
              </td>
              <td className="border px-4 py-4 sm:pl-6">{material.desc}</td>
              <td className="border px-4 py-4 sm:pl-6">{material.type}</td>
              <td className="border px-4 py-4 sm:pl-6">
                {material.diameter
                  ? `⌀${material.diameter}x${
                      material.size_height
                        ? material.size_height
                        : material.size_length
                    }`
                  : `${material.size_height}x${material.size_width}x${material.size_length}`}
              </td>
              <td className="border px-4 py-4 sm:pl-6">
                {material.weight ? material.weight.toFixed(2) : 0}
              </td>
              <td className="border px-4 py-4 sm:pl-6">
                <EditMaterial material={material} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default MaterialTable;
