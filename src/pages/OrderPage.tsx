import { Suspense, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCT_SUMMARY_CODE } from "@src/apis/BackEnd/apiList";
import PendingSpinner from "@src/components/shared/PendingSpinner";
import ToastContext from "@src/contexts/ToastContext";
import OrderPanel from "@src/components/OrderPanels/OrderPanel";
import { ErrorBoundary } from "react-error-boundary";

export type ProductData = {
  imageURL: string;
  id: number;
  name: string;
  brandName: string;
  price: number;
};

function OrderPage() {
  const toastContext = useContext(ToastContext);
  const navigate = useNavigate();

  return (
    <ErrorBoundary
      fallbackRender={() => (
        <>주문하기 페이지를 로딩하는 도중에 오류가 발생하였습니다.</>
      )}
      onError={(error) => {
        if (error.status === PRODUCT_SUMMARY_CODE.NO_PRODUCT) {
          toastContext?.message.setValue(error.message);
          navigate(`/`);
        }
      }}
    >
      <Suspense fallback={<PendingSpinner />}>
        <OrderPanel />
      </Suspense>
    </ErrorBoundary>
  );
}

export default OrderPage;
