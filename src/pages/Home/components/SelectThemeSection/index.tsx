// src/pages/SelectThemeSection.tsx
import React, { Component, Suspense, lazy } from 'react';
import styled from '@emotion/styled';
import { Typography } from '@/components/common/Typography';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
import type { UseFetchResult } from '@/hooks/useFetch';
import type { Theme } from './theme'; // Theme 타입 정의 위치에 맞춰 수정

// ListItem은 lazy 로드
const SelectThemeSectionListItem = lazy(() =>
  import('./ListItem').then((mod) => ({ default: mod.SelectThemeSectionListItem })),
);

// ErrorBoundary
class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: Error) {
    console.error('ThemeSection Error:', err);
  }
  render() {
    if (this.state.hasError) {
      return (
        <Section>
          <Typography as='p' variant='body1Regular' color='default'>
            테마를 불러오는 중 오류가 발생했습니다.
          </Typography>
        </Section>
      );
    }
    return this.props.children;
  }
}

// Spinner 컴포넌트
const spin = keyframes` to { transform: rotate(360deg); } `;
const Loader = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
const SpinWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
`;

// 본문 로직
function SelectThemeContent() {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch<{ data: Theme[] }>(
    { url: '/api/themes', method: 'get' },
    [],
  ) as UseFetchResult<{ data: Theme[] }>;

  if (loading) {
    return (
      <Section>
        <SpinWrapper>
          <Loader />
        </SpinWrapper>
      </Section>
    );
  }
  if (error || !data?.data.length) {
    // 에러나 데이터 비어 있으면 아예 렌더 안 함
    return null;
  }

  return (
    <Section>
      <TitleWrapper>
        <Typography as='h3' variant='title1Bold' color='default'>
          선물 테마
        </Typography>
      </TitleWrapper>
      <Wrapper>
        {data.data.map((theme) => (
          <Suspense key={theme.themeId} fallback={<Loader />}>
            <SelectThemeSectionListItem
              image={theme.image}
              label={theme.name}
              onClick={() => navigate(`/themes/${theme.themeId}/products`)}
            />
          </Suspense>
        ))}
      </Wrapper>
    </Section>
  );
}

// 최종 export 컴포넌트
export const SelectThemeSection: React.FC = () => (
  <ErrorBoundary>
    <Suspense
      fallback={
        <Section>
          <SpinWrapper>
            <Loader />
          </SpinWrapper>
        </Section>
      }
    >
      <SelectThemeContent />
    </Suspense>
  </ErrorBoundary>
);

// 레이아웃 스타일
const Section = styled.section(({ theme }) => ({
  padding: `0 ${theme.spacing.spacing2}`,
}));

const TitleWrapper = styled.div(({ theme }) => ({
  padding: `0 ${theme.spacing.spacing2} ${theme.spacing.spacing5}`,
}));

const Wrapper = styled.div(({ theme }) => ({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: `${theme.spacing.spacing5} ${theme.spacing.spacing1}`,
}));
