import styled from "@emotion/styled";
import { useProductInfo } from "@src/hooks/useProductInfo";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

function Description() {
  const productId = useParams().id ?? "";
  const productInfo = useProductInfo(productId);
  const safeDescription = DOMPurify.sanitize(
    productInfo.detailInfo.description
  );

  return safeDescription ? (
    <ContentBox dangerouslySetInnerHTML={{ __html: safeDescription }} />
  ) : (
    <EmptyBox />
  );
}

const EmptyBox = styled.div`
  width: 100%;
  height: 200px;
  background-color: white;
`;

const ContentBox = styled.div`
  padding: 10px;
  width: calc(100% - 2 * 10px);
  background-color: white;

  & > p > img {
    width: 100%;
  }
`;

export default Description;
