import type { ReceiverInfo } from './validation';

export interface ReceiverContextType {
    receiverList: ReceiverInfo[];
    updateReceiverList: (newList: ReceiverInfo[]) => void;
}
