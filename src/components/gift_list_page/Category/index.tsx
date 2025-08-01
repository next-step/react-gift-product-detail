import styled from '@emotion/styled';
import { CategoryCard } from '@/components/gift_list_page/Category/CategoryCard';
import { useSuspenseQuery } from '@tanstack/react-query';
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

const ErrorText = styled.div`
  position: absolute;
  justify-self: center;
  align-self: center;
  font-size: 1rem;
  font-weight: 500;
`;

export const Category = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return (
    <Container>
      <Title>선물 테마</Title>
      <Body>
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
      </Body>
    </Container>
  );
};
