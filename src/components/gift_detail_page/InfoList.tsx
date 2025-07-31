import styled from '@emotion/styled';

interface InfoList<T extends Record<string, React.ReactNode>> {
  items?: T[];
  label: keyof T;
  value: keyof T;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: auto;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: auto;
  box-sizing: border-box;
`;

const Key = styled.div`
  margin-top: 0.8rem;
  ${({ theme }) => theme.typography.label1Bold};
`;

const Value = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.8rem;
  ${({ theme }) => theme.typography.title2Regular};
`;

export const InfoList = <T extends Record<string, React.ReactNode>>({
  items,
  label,
  value,
}: InfoList<T>) => {
  return (
    <Container>
      {items?.map((item, index) => (
        <Item key={`${index}-${item[label]}-${item[value]}`}>
          <Key>{item[label]}</Key>
          <Value>{item[value]}</Value>
        </Item>
      ))}
    </Container>
  );
};
