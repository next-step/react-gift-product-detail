import { Suspense, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCT_SUMMARY_CODE, type APIError } from "@src/apis/BackEnd/apiList";
import PendingSpinner from "@src/components/shared/PendingSpinner";
import ToastContext from "@src/contexts/ToastContext";
import ErrorBoundary from "@src/components/shared/ErrorBoundary";
import ProductPanel from "@src/components/ProductPanels/ProductPanel";

function ProductPage() {
  const toastContext = useContext(ToastContext);
  const navigate = useNavigate();

  return (
    <ErrorBoundary
      fallbackRender={() => (
        <>제품 상세 페이지를 로딩하는 도중에 오류가 발생하였습니다.</>
      )}
      onError={(error: unknown) => {
        const customError = error as APIError;
        if (customError.status === PRODUCT_SUMMARY_CODE.NO_PRODUCT) {
          toastContext?.message.setValue(customError.message);
          navigate(`/`);
        }
      }}
    >
      <Suspense fallback={<PendingSpinner />}>
        <ProductPanel />
      </Suspense>
    </ErrorBoundary>
  );
}

export default ProductPage;
