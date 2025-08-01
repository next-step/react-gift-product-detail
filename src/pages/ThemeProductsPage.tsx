import { useParams } from 'react-router-dom';
import GlobalStyle from '@/styles/GlobalStyle';
import Header from '@/components/Header';
import ThemeProductGrid from '@/components/ThemeProductGrid';

import { Suspense } from 'react';
import Loading from '@/components/Common/Loading';
import ThemeHeroSection from '@/components/ThemeHeroSection';



const ThemeProductsPage = () => {
  const { themeId } = useParams<{ themeId: string }>();


  return (
    <div>
      <GlobalStyle />
      <Header />
      <Suspense fallback={<Loading />}>
        <ThemeHeroSection themeId={Number(themeId)} />
        <ThemeProductGrid themeId={Number(themeId)} />
      </Suspense>
    </div>
  );
};

export default ThemeProductsPage;