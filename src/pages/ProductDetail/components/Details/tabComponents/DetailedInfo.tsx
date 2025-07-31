import { useProductDetail } from '@/queries/useProductDetail';
import { theme } from '@/theme/theme';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

const Margin = styled.div<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
  background-color: transparent;
`;

const TextDummy = styled.div``;

const Title = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.1875rem;
  color: ${theme.semanticColors.text.default};
  margin: 0px;
  text-align: left;
`;

const Content = styled.p`
  white-space: pre-wrap;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.375rem;
  color: ${theme.semanticColors.text.default};
  margin: 0px;
  text-align: left;
`;

interface DetailedInfoProps {
  productId: number;
}

const DetailedInfo = ({ productId }: DetailedInfoProps) => {
  const { data, isLoading, isError } = useProductDetail(productId);

  if (isLoading) return <Wrapper>로딩 중…</Wrapper>;
  if (isError || !data) return <Wrapper>정보를 불러오지 못했습니다.</Wrapper>;

  const list = data.announcements ?? [];

  if (list.length === 0) return <Wrapper>표시할 상세 정보가 없습니다.</Wrapper>;

  return (
    <Wrapper>
      {list
        .sort((a, b: any) => a.displayOrder - b.displayOrder)
        .map((a) => (
          <TextDummy key={a.displayOrder}>
            <Margin height="16px" />
            <Title>{a.name}</Title>
            <Margin height="8px" />
            <Content>{a.value}</Content>
            <Margin height="8px" />
          </TextDummy>
        ))}
    </Wrapper>
  );
};

export default DetailedInfo;
