import type { ProductDetail } from '@/types/product';
import styled from '@emotion/styled';

export const ProductDescriptionTab = ({ productDetail }: { productDetail: ProductDetail }) => {
  return (
    <Container>
      <h2>상품 정보 고시</h2>
      <InfoTable>
        <tbody>
          {productDetail.announcements.map((item) => (
            <tr key={item.name}>
              <th>{item.name}</th>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </InfoTable>
    </Container>
  );
};

const Container = styled.div`
  padding: 16px 0;
`;

const InfoTable = styled.table`
  width: 100%;
  margin-top: 16px;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f9f9f9;
    width: 120px;
  }
`;
