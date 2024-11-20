import { Cell } from "@/db/interfaces/types";
import { Inventory } from "@/db/interfaces/types";

interface SuggestCellProps {
  broyBezOtk: number;
  broySOtk: number;
  materialWeight: number | null | undefined;
  materialId: number;
  thickness: number | null | undefined;
}

export const suggestCell = (cells: Cell[], newInventory: SuggestCellProps) => {
  const { broyBezOtk, broySOtk, materialWeight, materialId, thickness } =
    newInventory;
  if (materialWeight) {
    const requiredWeight = materialWeight * (broyBezOtk + broySOtk);

    //Step 1: Find cell with matching material ID
    const matchingCells = cells.filter(
      (cell) =>
        cell.inventories?.some(
          (inventory) => inventory.materialId === materialId
        ) &&
        cell.max_weight >=
          calculateCellWeight(cell.inventories) + requiredWeight
    );
    if (matchingCells.length > 0) {
      return matchingCells[0];
    }

    // Step 2: Check for free cells
    const freeCells = cells.filter(
      (cell) =>
        cell.inventories?.length === 0 && cell.max_weight >= requiredWeight
    );
    if (freeCells.length > 0) {
      return freeCells[0];
    }

    // Step 3: Find cells with sufficient weight capacity and closest thickness match
    const compatibleCells = cells
      .filter(
        (cell) =>
          cell.max_weight >=
          (cell.inventories ? calculateCellWeight(cell.inventories) : 0) +
            requiredWeight
      )
      .sort(
        (a, b) =>
          Math.abs(a.size_height - (thickness ?? 0)) -
          Math.abs(b.size_height - (thickness ?? 0))
      );

    return compatibleCells[0] || null;
  } else return null;
};

export const calculateCellWeight = (inventories: Inventory[]) => {
  if (!inventories || inventories.length === 0) return 0;
  const totalWeight = inventories.reduce((acc, inventory) => {
    if (inventory.material.weight) {
      return (
        acc +
        inventory.quan_dev * inventory.material.weight +
        inventory.quan_ok * inventory.material.weight
      );
    }
    return acc;
  }, 0);
  return totalWeight;
};
