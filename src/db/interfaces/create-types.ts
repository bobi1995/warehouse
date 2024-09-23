export interface CreateStillage {
  name: string;
  columns: number;
  shelves: number;
}

export interface CreateCell {
  x: number;
  y: number;
  z: number;
  max_weight: number;
  isolator: boolean;
  stillageId: number;
  code: string;
}
