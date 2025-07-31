import styled from '@emotion/styled';
import Loading from '@/components/Loading';
import useToggleCollapse from '../../hooks/useToggleCollapse';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/routePath';
import RankItem from './RankItem';
import useRanking from '../../hooks/useRanking';
import type { RankingApiProps } from '@/types';

const RankList = ({ activeGeneration, activeFilter }: RankingApiProps) => {
  const { data, isLoading } = useRanking({ activeGeneration, activeFilter });
  const { isCollapsed, visibleItemsCount, toggleCollapse } = useToggleCollapse(data?.length || 0);

  const navigate = useNavigate();
  const moveToOrder = (id: number) => {
    navigate(generatePath(ROUTE_PATH.PRODUCT, { id: String(id) }));
  };

  if (!data) return;
  if (isLoading) return <Loading />;
  if (data.length === 0) {
    return <NoDataMessage>상품이 없습니다.</NoDataMessage>;
  }

  return (
    <>
      <RankContainer>
        {data.slice(0, visibleItemsCount).map((rank, index) => (
          <RankItem key={rank.id} rank={rank} index={index} onClick={moveToOrder} />
        ))}
      </RankContainer>
      <ToggleButton onClick={toggleCollapse}>{isCollapsed ? '펼치기' : '접기'}</ToggleButton>
    </>
  );
};

export default RankList;

const NoDataMessage = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  color: ${({ theme }) => theme.colors.semantic.text.sub};
  padding: 2rem 0;
  font-size: 1.1rem;
`;

const RankContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing7} ${({ theme }) => theme.spacing.spacing2};
`;

const ToggleButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.spacing5};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.colorScale.gray[300]};
`;
