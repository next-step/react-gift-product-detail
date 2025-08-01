import { useHighlightReview } from '@/queries/useHighlightReview';
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

const ReviewCard = styled.div``;

const User = styled.p`
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

interface ReviewProps {
  productId: number;
}

const Review = ({ productId }: ReviewProps) => {
  const { data, isLoading, isError } = useHighlightReview(productId);

  if (isLoading) return <Wrapper>로딩 중…</Wrapper>;
  if (isError || !data) return <Wrapper>후기를 불러오지 못했습니다.</Wrapper>;

  return (
    <>
      <Wrapper>
        {data.reviews.map((r: any) => (
          <ReviewCard key={r.id}>
            <Margin height="16px" />
            <User>{r.authorName}</User>
            <Margin height="8px" />
            <Content>{r.content}</Content>
            <Margin height="8px" />
          </ReviewCard>
        ))}
      </Wrapper>
    </>
  );
};

export default Review;
