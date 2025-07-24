import { createContext, useContext} from "react";
import type { ReceiverContextType } from './types';

export const ReceiverContext = createContext<ReceiverContextType | null>(null);

export const useReceiver = () => {
    const context = useContext(ReceiverContext);
    if (!context) {
        throw new Error('ReceiverContext 내부사용 필요');
    }
    return context;
}
