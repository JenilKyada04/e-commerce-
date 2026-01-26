export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
  };
  
  export type Product = {
    id: number;
    title: string;
    brand: string;
    price: number;
  };
  
  export type Cart = {
    id: number;
    products: Product[];
    total: number;
  };
  