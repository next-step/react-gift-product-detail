import { Suspense } from 'react';
import Loading from '@/components/Common/Loading/Loading.tsx';
import Header from '@/components/Header/Header.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorBoundary } from '@/components/Common/ErrorBoundary.tsx';
import ThemeItemsContent from '@/components/GiftTheme/ThemeItem/ThemeItemsContent.tsx';
import { PATH } from '@/constants/path.ts';
import { AxiosError, HttpStatusCode } from 'axios';

export default function ThemeItems() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const themeId = Number(id);

  return (
    <>
      <Header />
      <ErrorBoundary
        onError={(error) => {
          const axiosError = error as AxiosError;

          if (axiosError.response?.status === HttpStatusCode.NotFound) {
            navigate(PATH.HOME);
          }
        }}
      >
        <Suspense fallback={<Loading />}>
          <ThemeItemsContent themeId={themeId} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
