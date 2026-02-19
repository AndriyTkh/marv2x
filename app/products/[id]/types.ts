/**
 * TypeScript interfaces for product data
 * Used by the product detail page component
 */

export interface ProductConditions {
  temperature?: string;
  humidity?: string;
  pressure?: string;
  gasVelocity?: string;
  typicalGasComposition?: Record<string, string>;
  gasFlow?: string;
}

export interface ProductApplication {
  process: string;
  description: string;
  conditions?: ProductConditions;
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string[];
  features: string[];
  applications: ProductApplication[];
  certifications: string[];
  imageUrls: string[];
  price: string;
  specs?: string;
}
