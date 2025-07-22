import { Suspense, useContext } from "react";
import PendingSpinner from "@src/components/shared/PendingSpinner";
import styled from "@emotion/styled";
import ThemeContents from "@src/components/ThemePanels/ThemeContents";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import ToastContext from "@src/contexts/ToastContext";
import { THEME_INFO_CODE, type APIError } from "@src/apis/BackEnd/apiList";

function ThemePage() {
  const navigate = useNavigate();
  const toastContext = useContext(ToastContext);

  return (
    <ThemePageWrapper>
      <ErrorBoundary
        fallbackRender={() => (
          <>테마 페이지를 로딩하는 도중 오류가 발생했습니다.</>
        )}
        onError={(error: unknown) => {
          const customError = error as APIError;
          if (customError.status === THEME_INFO_CODE.NOT_FOUND) {
            toastContext?.message.setValue(customError.message);
            navigate(`/`);
          }
        }}
      >
        <Suspense fallback={<PendingSpinner />}>
          <ThemeContents />
        </Suspense>
      </ErrorBoundary>
    </ThemePageWrapper>
  );
}

const ThemePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ThemePage;
