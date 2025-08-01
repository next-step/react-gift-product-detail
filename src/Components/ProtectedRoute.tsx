import { useLoginContext } from "@/hooks/useLoginContext";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { user, isInitialized } = useLoginContext();
  
  // 초기화가 완료되지 않았으면 로딩 표시
  if (!isInitialized) {
    return <LoadingSpinner message="로그인 상태를 확인하는 중..." />;
  }
  
  // 초기화가 완료되었지만 로그인하지 않은 경우 /login으로 리다이렉트
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
