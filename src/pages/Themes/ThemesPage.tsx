import styled from "@emotion/styled";
import Container from "@/components/common/Container";
import HeroSection from "@/pages/Themes/components/HeroSection";
import ProductList from "@/pages/Themes/components/ProductList";
import { Suspense } from "react";
import Loading from "@/components/common/Loading";

const ThemesPage = () => {
  return (
    <Container>
      <Contents>
        <Suspense fallback={<Loading height="7.95rem" />}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<Loading height="50vh" />}>
          <ProductList />
        </Suspense>
      </Contents>
    </Container>
  );
};

export default ThemesPage;

const Contents = styled.div`
  width: 100%;
  height: 100%;
`;
