export interface User {
  id: string;
  password: string;
  username: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Stillage {
  id: number;
  name: string;
  shelves: number;
  columns: number;
  type: string;
  cells?: Cell[];
  inventories?: Inventory[];
}
export interface Transaction {
  id: number;
  type: string;
  inventoryId?: number | null;
  userId: string;
  date: Date;
  quantity: number;
  inventory?: Inventory;
  user?: User;
  material?: Material;
}

export interface Inventory {
  id: number;
  materialId: number;
  stillageId?: number | null;
  storageId?: number | null;
  cellId?: number | null;
  lot: string;
  order: string;
  quan_dev: number;
  quan_ok: number;
  comment: string | null;
  desc: string | null;
  deliveryDate: Date;
  inboundDate: Date;
  material: Material;
  stillage?: Stillage | null;
  cell?: Cell | null;
  transactions?: Transaction[];
  storage?: Storage | null;
}

export interface Storage {
  id: number;
  name: string;
  inventories?: Inventory[];
}

export interface Material {
  id: number;
  size_length?: number | null;
  size_height?: number | null;
  size_width?: number | null;
  weight?: number | null;
  type: string;
  diameter?: number | null;
  lesto_code: string;
  desc?: string | null;
  inventories?: Inventory[];
  shape: string;
}

export interface Cell {
  id: number;
  stillageId: number;
  code: string;
  size_length: number;
  size_height: number;
  size_width: number;
  max_weight: number;
  isolator: boolean;
  inventories?: Inventory[];
}
