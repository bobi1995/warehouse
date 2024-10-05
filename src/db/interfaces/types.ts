export interface User {
  id: string;
  password: string;
  username: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Stillage {
  id: number;
  name: string;
  shelves: number;
  columns: number;
  cells: Cell[];
  inventories: Inventory[];
}
export interface Transaction {
  id: number;
  type: string;
  inventoryId: number;
  userId: string;
  date: string;
  inventory: Inventory;
  user: User;
}

export interface Inventory {
  id: number;
  materialId: number;
  stillageId: number;
  cellId: number;
  lot: string;
  order: string;
  quan_dev: number;
  quan_ok: number;
  comment: string | null;
  desc: string | null;
  deliveryDate: Date;
  inboundDate: Date;
  material?: Material;
  stillage?: Stillage;
  cell?: Cell;
  transactions?: Transaction[];
}

export interface Material {
  id: number;
  size_length: number;
  size_height: number;
  size_width: number;
  weight: number;
  type: string;
  lesto_code: string;
  inventories: Inventory[];
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
}
