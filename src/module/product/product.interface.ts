export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: IProductVariant[];
  inventory: IProductInventory;
}

export interface IProductVariant {
  type: string;
  value: string;
}

export interface IProductInventory {
  quantity: number;
  inStock: boolean;
}
