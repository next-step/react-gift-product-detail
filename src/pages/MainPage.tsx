import CheerUpPanel from "@src/components/CheerUpPanel";
import GiftThemePanel from "@src/components/GiftThemePanel";
import RealTimeRankPanel from "@src/components/RealTimeRankPanel/RealTimeRankPanel";
import RecipientSelector from "@src/components/RecipientSelector";
import ErrorBoundary from "@src/components/shared/ErrorBoundary";
import PendingSpinner from "@src/components/shared/PendingSpinner";
import ToastContext from "@src/contexts/ToastContext";
import { Suspense, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

function Mainpage() {
  const toastContext = useContext(ToastContext);

  useEffect(() => {
    if (toastContext!.message.value) {
      toast(toastContext!.message.value, {
        type: "error",
        position: "bottom-center"
      });
      toastContext!.message.setValue(null);
    }
  }, [toastContext!.message.value]);

  return (
    <>
      <RecipientSelector />
      <ErrorBoundary>
        <Suspense fallback={<PendingSpinner />}>
          <GiftThemePanel />
        </Suspense>
      </ErrorBoundary>
      <CheerUpPanel />
      <RealTimeRankPanel />
      <ToastContainer />
    </>
  );
}

export default Mainpage;
