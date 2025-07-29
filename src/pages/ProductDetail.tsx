import Layout from '@/components/layout/Layout';
import NavigationBar from '@/components/navigation-bar/NavigationBar';
import styled from '@emotion/styled';

const ImageUrl = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  background-color: ${({ theme }) => theme.color.semantic.background.default};
`;
const ProductDetail = () => {
  return (
    <Layout>
      <NavigationBar />
      <ImageUrl></ImageUrl>
    </Layout>
  );
};

export default ProductDetail;
