import type { ProductSummary } from '@/entities/product/model/types';

export interface CardState {
  selectedCardId: number;
  message: string;
}

export interface FormData {
  senderName: string;
}

export interface UseOrderFormProps {
  product?: ProductSummary;
}

export type CardStateUpdater = (updater: (prev: CardState) => CardState) => void;
export type FormDataUpdater = (updater: (prev: FormData) => FormData) => void;