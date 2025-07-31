type RecipientForm = {
  name: string;
  phoneNumber: string;
  quantity: number;
};

export type OrderForm = {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: RecipientForm[];
};

export type FormValues = {
  message: string;
  senderName: string;
  recipientInfo: RecipientForm[];
};
