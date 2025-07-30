import { baseUrl } from "@/constant/api";
import { useOrder } from "@/context/OrderContext";
import { useReceiver } from "@/context/ReceiverContext";
import { useLocation, useNavigate } from "react-router-dom";
import {type ProductItemSummary } from "@/type/GiftAPI/product";
import { getFromUrl } from "@/utils/getFromUrl";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { orderAPI } from "@/utils/orderApi";
import { useQuery } from "@tanstack/react-query";
import useProductSummary from "./useProductSummary";


function useOrderCompleteMessage() {
  const { ordererName, message, messageCardId } = useOrder();
  const { receivers } = useReceiver();

  const navigate = useNavigate();

  const total = receivers.reduce((acc, receiver) => acc + receiver.quantity, 0);
  const {id, name } = useProductSummary();

  const handleOrder = async () => {
    ordererName.validate();

    if (!ordererName.error) {
      try {
        await orderAPI(
          (id ?? 0),
          message,
          messageCardId,
          ordererName.value,
          receivers,
        )
        alert(`주문이 완료되었습니다. 
        상품명:${name} 
        구매수량: ${total}
        발신자 이름: ${ordererName.value}
        메세지: ${message}
        `);
        navigate('/');
      } catch (error) {
        navigate('/login');
        throw new Error(`${(error as Error).message}`);
      }
    }
  };

  
    return {
      total, handleOrder
    }
};


export default useOrderCompleteMessage