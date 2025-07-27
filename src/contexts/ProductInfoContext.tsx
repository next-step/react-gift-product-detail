import { createContext } from 'react';

type ProductInfoContext = {
  messageCardId: string;
  setMessageCardId: React.Dispatch<React.SetStateAction<string>>;
  id: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  brand: string;
  setBrand: React.Dispatch<React.SetStateAction<string>>;
};

export const ProductInfoContext = createContext<ProductInfoContext | null>(null);
