import styled from '@emotion/styled';

export const Container = styled.section`
  margin: 16px 0;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.colorScale.gray[0]};
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(72px, 1fr));
  margin-top: 12px;
  gap: 13px;
`;

export const Item = styled.div`
  text-align: center;
  cursor: pointer;
`;

export const ItemImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ItemName = styled.p`
  font-size: 12px;
  margin-top: 8px;
`;
