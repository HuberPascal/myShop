// Definiert die Struktur eines Produktobjekts
export interface Product {
  id?: number;
  category?: string | null;
  brand?: string | null;
  name?: string | null;
  productPrice?: number;
  basePrice?: string | null;
  productSpecification?: string | null;
  numberOfRating?: number;
  imgSrc?: string | null;
  rating?: number;
}


// id: number;
// category: string | null;
// brand: string;
// name: string;
// productPrice: number;
// basePrice: string;
// productSpecification: string;
// numberOfRating: number;
// imgSrc: string;
// rating: number;