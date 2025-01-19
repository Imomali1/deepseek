export interface ProductVariant {
    color: string;
    size: string;
    quantity: number;
  }
  
  export interface Product {
    id: number;
    name: string;
    category: string;
    basePrice: number;
    description: string;
    variants: ProductVariant[];
    totalStock: number;
  }
  
  export type SortKey = 'name' | 'category' | 'basePrice' | 'totalStock';
  export type SortDirection = 'asc' | 'desc';
  
  export interface SortConfig {
    key: SortKey;
    direction: SortDirection;
  }