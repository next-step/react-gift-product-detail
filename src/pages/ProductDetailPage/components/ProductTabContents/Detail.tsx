import { QUERY_KEY } from "@/constants/queryKey";
import { getProductDetailInfo } from "@/data/api";
import styled from "@emotion/styled";
import { useSuspenseQuery } from "@tanstack/react-query";

const DetailListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
  margin-top: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[7]};
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const DetailTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.body.body2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body2Bold.fontWeight};
  color: ${({ theme }) => theme.colors.text.default};
`;

const DetailContent = styled.p`
  font-size: ${({ theme }) => theme.typography.body.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.body1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.text.default};
`;

function Detail({ productId }: { productId: string }) {
  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.PRODUCT_DETAIL_INFO(productId),
    queryFn: () => getProductDetailInfo(productId),
  });

  return (
    <DetailListContainer>
      {data.announcements.map((el) => {
        return (
          <DetailContainer>
            <DetailTitle>{el.name}</DetailTitle>
            <DetailContent>{el.value}</DetailContent>
          </DetailContainer>
        );
      })}
    </DetailListContainer>
  );
}

export default Detail;
