import styled from "@emotion/styled";
import { useProductInfo } from "@src/hooks/useProductInfo";
import { useParams } from "react-router-dom";

function Description() {
  const productId = useParams().id ?? "";
  const productInfo = useProductInfo(productId);
  const descriptionImageSource =
    productInfo.detailInfo.description.split('"')[3];

  return descriptionImageSource ? (
    <DescriptionImage src={descriptionImageSource} alt="description image" />
  ) : (
    <EmptyBox />
  );
}

const DescriptionImage = styled.img`
  width: calc(100% - 2 * 20px);
  padding: 20px;
`;

const EmptyBox = styled.div`
  width: 100%;
  height: 200px;
`;

export default Description;
