import CheerUpMessage from '../CheerUpMessage';
import { ThemeField } from '@/features/themeCatalog';
import * as S from './styles';
import { ErrorBoundary, Loading } from '@/shared/ui';
import { Suspense } from 'react';

const ThemeSection = () => {
  return (
    <S.Section>
      <ErrorBoundary>
        <Suspense fallback={<Loading/>}>
          <ThemeField />
          <CheerUpMessage />   
        </Suspense>
      </ErrorBoundary>
    </S.Section>
  );
};

export default ThemeSection; 