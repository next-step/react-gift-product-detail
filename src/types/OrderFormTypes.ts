export type Receiver = {
  id: string;
  name: string;
  phoneNumber: string;
  quantity: string;
};

export type FormType = {
  cardId: string;
  message: string;
  sender: string;
  receivers: Receiver[];
};
