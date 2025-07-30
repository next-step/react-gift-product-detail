import { useParams } from 'react-router';
import styled from '@emotion/styled';
import { Spinner } from '@/components/common/Spinner';

import { ROUTE_PATH } from '../Routes';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { ThemeHeroSection } from './components/ThemeHeroSection';
import { ThemeProductListSection } from './components/ThemeProductListSection';
import { useReadThemeInfo } from '@/apis/hooks/useReadThemeInfo';
import AsyncBoundary from '@/components/common/AsyncBoundary';
import { AxiosError } from 'axios';
import ErrorBoundary from '@/components/common/ErrorBoundary';

const ThemesPage = () => {
  const navigate = useNavigate();

  const { themeId = '' } = useParams();

  return (
    <AsyncBoundary
      pendingFallback={
        <LoadingWrapper>
          <Spinner size='large' color='kakaoBrown' />
        </LoadingWrapper>
      }
      onError={(error) => {
        if (error instanceof AxiosError) {
          const errorMessage = error.response?.data.data.message;

          if (errorMessage) {
            toast.error(errorMessage);
          }

          navigate(ROUTE_PATH.HOME);
        }
      }}
    >
      <Themes themeId={themeId} />
    </AsyncBoundary>
  );
};

const Themes = ({ themeId }: { themeId: string }) => {
  const { data: themeInfo } = useReadThemeInfo({ themeId });

  return (
    <Wrapper>
      <ThemeHeroSection themeInfo={themeInfo} />
      <ErrorBoundary>
        <ThemeProductListSection themeId={themeId} />
      </ErrorBoundary>
    </Wrapper>
  );
};

export default ThemesPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 2.75rem);
  display: flex;
  align-items: center;
  justify-content: center;
`;
