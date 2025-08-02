import styled from '@emotion/styled';
import useProductDetailQuery from '../hooks/useProductDetailQuery';

interface ProductDetailSectionProps {
  index: number;
}

const ProductDetailSection = ({ index }: ProductDetailSectionProps) => {
  const detailDatas = useProductDetailQuery(index);
  return (
    <div>
      <div>
        <div>
          {detailDatas.announcements?.map(data => (
            <div key={data.displayOrder}>
              <Title>{data.name}</Title>
              <Text>{data.value}</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSection;

const Title = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.1875rem;
  color: rgb(42, 48, 56);
  margin: 0px;
  text-align: left;
`;

const Text = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.375rem;
  color: rgb(42, 48, 56);
  margin: 0px;
  text-align: left;
`;
