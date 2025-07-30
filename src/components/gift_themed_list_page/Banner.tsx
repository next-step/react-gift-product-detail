import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getThemeInfo } from '@/api/services/giftItem.service';
import type { QueryKey } from '@/api/types/giftItem.dto';

const Container = styled.div<{ backgroundColor: string }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: auto;
  margin-top: 2.8rem;
  box-sizing: border-box;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding-top: ${({ theme }) => theme.spacing.spacing6};
  padding-bottom: ${({ theme }) => theme.spacing.spacing5};
  padding-left: ${({ theme }) => theme.spacing.spacing4};
`;

const ThemeName = styled.div`
  ${({ theme }) => theme.typography.label1Bold}
  color: white;
`;

const Title = styled.div`
  ${({ theme }) => theme.typography.title1Bold}
  margin-top: ${({ theme }) => theme.spacing.spacing2};
  color: white;
`;

const Description = styled.div`
  ${({ theme }) => theme.typography.title2Regular}
  margin-top: ${({ theme }) => theme.spacing.spacing1};
  color: white;
`;

const ErrorText = styled.div`
  margin: auto;
  font-size: 1rem;
  font-weight: 500;
`;

export const Banner = () => {
  const { id } = useParams();
  if (!id) throw new Error('id가 없습니다');
  const parsedId = parseInt(id!);
  const { data, isError } = useQuery({
    queryKey: ['ThemeInfo', { id: parsedId }],
    queryFn: ({ queryKey }: { queryKey: QueryKey }) => {
      const { id } = queryKey[1];
      if (!id) return;
      return getThemeInfo(id);
    },
  });
  const { name, title, description, backgroundColor } = data || {
    name: '',
    title: '',
    description: '',
    backgroundColor: '#FFFFFF',
  };

  return (
    <Container backgroundColor={backgroundColor}>
      {name && <ThemeName>{name}</ThemeName>}
      {title && <Title>{title}</Title>}
      {description && <Description>{description}</Description>}
      {isError && <ErrorText>⚠️ 테마 정보를 불러오는 데 실패했습니다.</ErrorText>}
    </Container>
  );
};
