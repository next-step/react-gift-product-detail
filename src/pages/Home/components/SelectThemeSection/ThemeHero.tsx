// src/pages/ThemeHero.tsx

import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

export interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

interface ThemeHeroProps {
  themeId: number;
}

export function ThemeHero({ themeId }: ThemeHeroProps) {
  const navigate = useNavigate();
  const {
    data: info,
    isLoading,
    error,
  } = useQuery<ThemeInfo, AxiosError>({
    queryKey: ['themeInfo', themeId],
    queryFn: () =>
      axios
        .get<{ data: ThemeInfo }>(`/api/themes/${themeId}/info`)
        .then(res => res.data.data),
    staleTime: 1000 * 60 * 5,   // 5분간 데이터 신선도로 간주
    retry: false,               // 404 등 오류 시 재시도 비활성화
  });

  // 404는 홈으로 리디렉션, 그 외는 콘솔에 로깅
  useEffect(() => {
    if (error) {
      if (error.response?.status === 404) {
        navigate('/', { replace: true });
      } else {
        console.error('테마 상세 정보 로드 실패:', error);
      }
    }
  }, [error, navigate]);

  if (isLoading) {
    return <CenteredMessage>로딩 중…</CenteredMessage>;
  }
  if (error) {
    return <CenteredMessage>정보를 불러오는 중 오류가 발생했습니다.</CenteredMessage>;
  }
  if (!info) {
    return null;
  }

  const { title, description, backgroundColor } = info;

  return (
    <HeroSection style={{ backgroundColor }}>
      <HeroTitle>{title}</HeroTitle>
      <HeroDescription>{description}</HeroDescription>
    </HeroSection>
  );
}

// Styled components

const CenteredMessage = styled.div`
  padding: 2rem;
  text-align: center;
`;

const HeroSection = styled.section`
  padding: 60px 20px;
  color: #fff;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 16px;
`;

const HeroDescription = styled.p`
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto;
`;
