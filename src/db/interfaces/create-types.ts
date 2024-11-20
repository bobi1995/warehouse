export interface CreateStillage {
  name: string;
  columns: number;
  shelves: number;
  type: string;
}

export interface CreateCell {
  size_length: number;
  size_height: number;
  size_width: number;
  max_weight: number;
  isolator: boolean;
  stillageId: number;
  code: string;
  id?: number;
}

export interface CreateMaterial {
  type: string;
  size_length?: number;
  size_height?: number;
  size_width?: number;
  weight?: number;
  lesto_code: string;
  desc?: string | null;
  diameter?: number;
  shape: "sheet" | "bar" | "circle" | "cylinder" | "other";
}

export interface CreateTransaction {
  id: number;
  type: string;
  inventoryId: number;
  userId: string;
  date: string;
}

export interface CreateInventory {
  materialId: number;
  stillageId?: number;
  storageId?: number;
  cellId?: number;
  lot: string;
  order: string;
  quan_dev?: number;
  quan_ok?: number;
  comment?: string | null;
  desc?: string | null;
  deliveryDate: Date;
  inboundDate: Date;
  email: string;
}
