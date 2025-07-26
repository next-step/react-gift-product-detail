import styled from "@emotion/styled";

const RankingListEmpty = () => {
  return (
    <Empty>
      <Msg>상품이 없습니다.</Msg>
    </Empty>
  );
};

export default RankingListEmpty;

const Empty = styled.div`
  width: 100%;
  display: flex;
  height: 240px;
  justify-content: center;
  align-items: center;
`;
const Msg = styled.p`
  width: 100%;
  font: ${({ theme }) => theme.typography.label1Regular};
  text-align: center;
`;
