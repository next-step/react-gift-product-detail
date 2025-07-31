// src/pages/SelectThemeSection.tsx

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Typography } from '@/components/common/Typography';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
import type { UseFetchResult } from '@/hooks/useFetch';
import type { Theme } from './theme';
import ErrorBoundary from '@/pages/Home/components/ErrorBoundary';
import { SelectThemeSectionListItem } from './ListItem';

// Spinner 컴포넌트
const spin = keyframes`
  to { transform: rotate(360deg); }
`;
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
        {data.data.map(theme => (
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
