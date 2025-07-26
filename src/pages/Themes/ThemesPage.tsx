import styled from "@emotion/styled";
import Container from "@/components/common/Container";
import HeroSection from "@/pages/Themes/components/HeroSection";
import ProductList from "@/pages/Themes/components/ProductList";
import { Suspense } from "react";
import Loading from "@/components/common/Loading";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import { showFetchErrorToast } from "@/utils/showFetchToast";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@/components/routes/routePath";

const ThemesPage = () => {
  const navigate = useNavigate();
  const goHome = useCallback(() => navigate(ROUTE_PATH.HOME), [navigate]);

  return (
    <Container>
      <Contents>
        <ErrorBoundary fallback={null} onError={(error) => showFetchErrorToast(error, goHome)}>
          <Suspense fallback={<Loading height="7.95rem" />}>
            <HeroSection />
          </Suspense>
          <Suspense fallback={<Loading height="50vh" />}>
            <ProductList />
          </Suspense>
        </ErrorBoundary>
      </Contents>
    </Container>
  );
};

export default ThemesPage;

const Contents = styled.div`
  width: 100%;
  height: 100%;
`;
