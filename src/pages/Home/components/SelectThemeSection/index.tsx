// src/pages/SelectThemeSection.tsx

import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@/components/common/Typography';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import type { Theme } from './theme';
import ErrorBoundary from '@/pages/Home/components/ErrorBoundary';
import { SelectThemeSectionListItem } from './ListItem';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;
const Loader = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(0,0,0,0.1);
  border-top-color: rgba(0,0,0,0.7);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
const SpinWrapper = styled.div`
  display:flex; align-items:center; justify-content:center;
  height:150px;
`;

// 테마 목록을 가져오는 커스텀 훅
function useThemes() {
  return useQuery<Theme[], AxiosError>({
    queryKey: ['themes'],
    queryFn: () =>
      axios
        .get<{ data: Theme[] }>('/api/themes')
        .then(res => res.data.data),
    staleTime: 1000 * 60 * 5, // 5분 동안은 리패칭 안 함
  });
}

function SelectThemeContent() {
  const navigate = useNavigate();
  const { data: themes = [], isLoading, isError } = useThemes();

  if (isLoading) {
    return (
      <Section>
        <SpinWrapper><Loader /></SpinWrapper>
      </Section>
    );
  }
  if (isError || themes.length === 0) {
    // 에러나 데이터가 없다면 화면에 렌더하지 않거나, 다른 메시지
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
        {themes.map(theme => (
          <SelectThemeSectionListItem
            key={theme.themeId}
            image={theme.image}
            label={theme.name}
            onClick={() => navigate(`/themes/${theme.themeId}/products`)}
          />
        ))}
      </Wrapper>
    </Section>
  );
}

export const SelectThemeSection: React.FC = () => (
  <ErrorBoundary>
    <SelectThemeContent />
  </ErrorBoundary>
);

// Styled
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
