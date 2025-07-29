import Navbar from '@/components/navbar/Navbar';
import { PaddingSm } from './../components/common/Padding';
import styled from '@emotion/styled';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { fetchthemeInfo, fetchThemeProducts } from '@/services/themeApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/Router';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

const Header = styled.section`
  width: 100%;
  padding: 1.625rem 1rem 1.375rem;
  background-color: rgb(89, 73, 163);
`;
const CategoryName = styled.p`
  ${({ theme }) => theme.typography.subtitle2Bold};
  color: ${({ theme }) => theme.colors.gray.gray100};
  margin: 0px;
  text-align: left;
`;
const ListContainer = styled.div`
  padding: 16px;
  width: 100%;
`;
const GridWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 8px;
`;
const Card = styled.a``;
const Image = styled.img`
  width: 100%;
  height: 100%;
  min-height: 100%;
  min-width: 100%;
  object-fit: cover;
  object-position: center center;
  border-radius: 4px;
  overflow: hidden;
  background-color: rgb(243, 244, 245);
`;

const Theme = () => {
  const { themeId } = useParams();
  const themeIdNumber = Number(themeId);
  const navigate = useNavigate();

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const LIMIT = 10;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['themeProducts', themeIdNumber],
    queryFn: ({ pageParam = 0 }) => fetchThemeProducts(themeIdNumber, pageParam, LIMIT),
    getNextPageParam: (lastPage) => (lastPage.hasMoreList ? lastPage.cursor : undefined),
  });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  const {
    data: themeData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['theme', themeIdNumber],
    queryFn: () => fetchthemeInfo(themeIdNumber),
  });

  useEffect(() => {
    if (error) {
      if (axios.isAxiosError(error)) {
        const status = error.status;
        if (status === 404) {
          toast.error('선물 테마 정보를 받아올 수 없어요.');
          navigate(ROUTE_PATH.HOME);
        }
      }
    }
  }, [error]);

  const products = data?.pages.flatMap((page) => page.list) ?? [];

  if (isLoading || !themeData) return <div>로딩중...</div>;

  return (
    <div>
      <Navbar />
      <Header style={{ backgroundColor: themeData.color }}>
        <CategoryName>{themeData.name}</CategoryName>
        <PaddingSm />
        <h5>{themeData.title}</h5>
        <PaddingSm />
        <p>{themeData.description}</p>
      </Header>

      <ListContainer>
        <GridWrapper>
          {products.map((product: any) => (
            <Card key={product.id}>
              <div>
                <Image src={product.imageURL} alt={product.name} />
                <PaddingSm />
                <p>{product.brand}</p>
                <h6>{product.name}</h6>
                <p>{product.price.sellingPrice}원</p>
              </div>
            </Card>
          ))}
        </GridWrapper>
        {/* 감시대상 */}
        <div ref={ref} style={{ height: '1px' }} />
      </ListContainer>
    </div>
  );
};

export default Theme;
