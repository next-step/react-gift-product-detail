import styled from '@emotion/styled';
import ProductExplain from './tabComponents/ProductExplain';
import Review from './tabComponents/Review';
import DetailedInfo from './tabComponents/DetailedInfo';

const Container = styled.div`
  min-height: 400px;
`;

const Wrapper = styled.div`
  width: 100%;
`;

interface ContentProps {
  active: 'explain' | 'review' | 'detail';
  productId: number;
}

const Content = ({ active, productId }: ContentProps) => {
  return (
    <>
      <Container>
        <Wrapper>
          {active === 'explain' && <ProductExplain productId={productId} />}
          {active === 'review' && <Review productId={productId} />}
          {active === 'detail' && <DetailedInfo productId={productId} />}
        </Wrapper>
      </Container>
    </>
  );
};

export default Content;
