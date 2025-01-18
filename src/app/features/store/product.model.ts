// Definiert die Struktur eines Produktobjekts
export interface Product {
  id: number;
  category: string;
  brand: string;
  name: string;
  productPrice: number;
  basePrice?: string;
  productSpecification: string;
  numberOfRating: number;
  imgSrc: string;
  rating: number;
}
