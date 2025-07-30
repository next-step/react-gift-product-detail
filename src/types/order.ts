export interface OrderInfoValues {
  message: string;
  name: string;
  receiverInfos: { name: string; phoneNumber: string; quantity: number }[];
}
export interface OrderResponseData {
  success: boolean;
}
