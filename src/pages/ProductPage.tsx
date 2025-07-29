import LoadingSpinner from "@/components/common/LoadingSpinner";
import TheHeader from "@/components/layout/TheHeader";
import withUser from "@/hoc/withUser";
import useProductsQueries from "@/hooks/useProductsQueries";
import styled from "@emotion/styled";
import { useParams } from "react-router";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();

  const { products, productsWish, productsDetail, productsReview, isPending } =
    useProductsQueries({ id: id ?? "" });

  if (
    !products ||
    !productsWish ||
    !productsDetail ||
    !productsReview ||
    isPending
  ) {
    return <LoadingSpinner height="266px" />;
  }

  return (
    <>
      <TheHeader />
      <Main></Main>
    </>
  );
};

export default withUser(ProductPage);

const Main = styled.main`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray.gray200};
  height: 100%;
  min-height: calc(100vh - 44px);
`;
