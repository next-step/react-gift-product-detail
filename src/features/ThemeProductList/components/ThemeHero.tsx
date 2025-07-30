import LoadingSpinner from '@components/common/LoadingSpinner';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { ThemeProductProps } from '../themeProductType';
import { themeHeroInfoOptions } from '@queries/theme';

export interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

const ThemeHero = ({ id }: ThemeProductProps) => {
  const { data, isPending, isError, error } = useQuery(
    themeHeroInfoOptions(id)
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (isError && axios.isAxiosError(error)) {
      const status = error.status;
      if (status === 404) {
        toast.error('해당 테마와 일치하는 데이터가 없습니다.', {
          autoClose: 2000,
          onClose: () => navigate('/'),
        });
      } else {
        toast.error(error.message);
      }
    }
  }, [error, isError, navigate]);

  if (isPending) return <LoadingSpinner />;

  return (
    <Banner color={data?.backgroundColor}>
      <Name>{data?.name}</Name>
      <Title>{data?.title}</Title>
      <Description>{data?.description}</Description>
    </Banner>
  );
};

export default ThemeHero;

const Banner = styled.div(({ theme, color }) => ({
  backgroundColor: color,
  color: 'white',
  padding: theme.spacing.spacing6,
}));

const Name = styled.p(({ theme }) => ({
  ...theme.typography.label1Bold,
}));

const Title = styled.h1(({ theme }) => ({
  ...theme.typography.title1Bold,
  margin: `${theme.spacing.spacing2} 0`,
}));

const Description = styled.p(({ theme }) => ({
  ...theme.typography.body1Regular,
}));
