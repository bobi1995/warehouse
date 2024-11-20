"use client";
import { Material, Stillage } from "@/db/interfaces/types";
import { useState } from "react";
import axios from "axios";

interface MaterialFormProps {
  materials: Material[];
  setSelectedMaterial: (material: Material) => void;
  setStillage: (stillage: Stillage | null) => void;
}

const MaterialForm: React.FC<MaterialFormProps> = ({
  materials,
  setSelectedMaterial,
  setStillage,
}) => {
  const [code, setCode] = useState("");
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCode(value);

    if (value.length >= 3) {
      const filtered = materials.filter((material) =>
        material.lesto_code.toLowerCase().startsWith(value.toLowerCase())
      );

      setFilteredMaterials(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (material: Material) => {
    setCode(material.lesto_code);
    setShowSuggestions(false);
    setSelectedMaterial(material);
    setStillage(null);
    setCode("");
  };

  return (
    <div>
      <div className="flex mb-3 items-center justify-center">
        <label
          className="w-15 mb-3 mt-5 block text-md font-medium text-gray-900"
          htmlFor="code"
        >
          ЛЕСТО КОД:
        </label>
        <input
          className="ml-1 h-12 peer block w-48 rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
          id="code"
          name="code"
          placeholder="301..."
          required
          value={code}
          type="text"
          onChange={handleInputChange}
        />
      </div>

      {showSuggestions && filteredMaterials.length > 0 && (
        <ul className="border border-gray-300 rounded-md max-h-40 overflow-y-auto bg-white">
          {filteredMaterials.map((material) => (
            <li
              key={material.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(material)}
            >
              {material.lesto_code} - {material.desc}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MaterialForm;
