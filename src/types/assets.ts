export interface Asset {
  id: number;
  name: string;
  description: string;
  value: number;
  location: string;
}

export interface CreateAssetData {
  name: string;
  description: string;
  value: number;
  location: string;
}

export enum AssetModalVariant { 
  CREATE,
  UPDATE,
}