export interface CreateStillage {
  name: string;
  columns: number;
  shelves: number;
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
  size_length: number;
  size_height: number;
  size_width: number;
  weight: number;
  lesto_code: string;
}
