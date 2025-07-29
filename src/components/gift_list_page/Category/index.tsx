import styled from '@emotion/styled';
import type { CategoryCardData } from '@/api/types/giftItem.dto';
import { CategoryCard } from '@/components/gift_list_page/Category/CategoryCard';
import { keyframes } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/api/services/giftItem.service';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 21.8rem;
  background-color: white;
`;

const Title = styled.div`
  ${({ theme }) => theme.typography.title1Bold};
  margin-top: ${({ theme }) => theme.spacing.spacing8};
  margin-left: ${({ theme }) => theme.spacing.spacing4};
  color: black;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 16.92rem;
  margin-top: ${({ theme }) => theme.spacing.spacing5};
`;

const CategoryList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: calc(100% - ${({ theme }) => theme.spacing.spacing3});
  height: fit-content;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const ErrorText = styled.div`
  position: absolute;
  justify-self: center;
  align-self: center;
  font-size: 1rem;
  font-weight: 500;
`;

const Spinner = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  border: 0.2rem solid #ccc;
  border-top-color: ${({ theme }) => theme.colors.gray900};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

export const Category = () => {
  const { data, isLoading, isError } = useQuery<CategoryCardData[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return (
    <Container>
      <Title>선물 테마</Title>
      <Body>
        {isLoading && <Spinner />}
        {!isLoading && (
          <CategoryList>
            {data?.length === 0 ? (
              <ErrorText>표시할 데이터가 없습니다.</ErrorText>
            ) : (
              data?.map((item) => {
                return (
                  <CategoryCard
                    key={item.themeId}
                    id={item.themeId}
                    name={item.name}
                    image={item.image}
                  />
                );
              })
            )}
          </CategoryList>
        )}
        {isError && (
          <ErrorText>⚠️ 요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</ErrorText>
        )}
      </Body>
    </Container>
  );
};
