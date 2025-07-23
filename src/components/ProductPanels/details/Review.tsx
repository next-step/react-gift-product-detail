import styled from "@emotion/styled";
import { useProductInfo } from "@src/hooks/useProductInfo";
import theme from "@src/styles/kakaoTheme";
import { useParams } from "react-router-dom";

function Review() {
  const productId = useParams().id ?? "";
  const productInfo = useProductInfo(productId);

  return productInfo.reviewInfo.totalCount > 0 ? (
    <>
      {productInfo.reviewInfo.reviews.map((review) => {
        return (
          <ProfileBox key={review.id}>
            <DummyProfile>{review.authorName[0]}</DummyProfile>
            <ReviewBox>
              <Reviewer>{review.authorName}</Reviewer>
              <ReviewContent>{review.content}</ReviewContent>
            </ReviewBox>
          </ProfileBox>
        );
      })}
    </>
  ) : (
    <></>
  );
}

const ProfileBox = styled.div`
  display: flex;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  margin: 10px;
`;

const DummyProfile = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background-color: ${theme.colors.yellow.yellow500};
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`;

const ReviewBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Reviewer = styled.div`
  padding-left: 10px;
  font-size: 12px;
  font-weight: bold;
`;

const ReviewContent = styled.div`
  padding-left: 10px;
`;

export default Review;
