import { BaseUrl } from "@/constant/api";
import { useOrder } from "@/context/OrderContext";
import { useReceiver } from "@/context/ReceiverContext";
import { useLocation, useNavigate } from "react-router-dom";
import useFetchFromUrlT from "./useFetchFromUrlT";
import { defaultProductItemSummary, type ProductItemSummary } from "@/type/GiftAPI/product";
import { getFromUrl } from "@/utils/getFromUrl";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { orderAPI } from "@/utils/orderApi";


function useOrderCompleteMessage() {
  const { ordererName, message, messageCardId } = useOrder();
  const { receivers } = useReceiver();

  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const idParam = query.get('id');
  const id = idParam !== null ? Number(idParam) : null;

  const productUrl = `${BaseUrl}/api/products/${id}/summary`;
  const { item, error } = useFetchFromUrlT<ProductItemSummary>(productUrl, getFromUrl, defaultProductItemSummary);


  useEffect(() => {
    if (error) {
      toast.error((error as Error).message);
      navigate('/');
    }
  }, [error, navigate]);

  const price = item?.price;
  const imageUrl = item?.imageURL;
  const name = item?.name;
  const brandName = item?.brandName;


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

  const total = receivers.reduce((acc, receiver) => acc + receiver.quantity, 0);
    return {
        price, imageUrl, name, brandName, total, handleOrder
    }
};


export default useOrderCompleteMessage