// components/order/RecipientSection.tsx
import styled from '@emotion/styled';
import type { Recipient } from '@/components/order/RecipientModal';

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.spacing5};
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

const RecipientHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
`;

const EditButton = styled.button`
  padding: ${({ theme }) => theme.spacing.spacing2};
  background-color: ${({ theme }) => theme.colors.gray.gray100};
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  font-size: ${({ theme }) => theme.typography.label1Bold.fontSize};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

const EmptyRecipientBox = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing5};
  border: 1px solid ${({ theme }) => theme.colors.gray.gray300};
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  background-color: ${({ theme }) => theme.colors.semantic.backgroundDefault};
  text-align: center;
  color: ${({ theme }) => theme.colors.semantic.textSub};
`;

const RecipientTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${({ theme }) => theme.spacing.spacing2};

  th,
  td {
    padding: ${({ theme }) => theme.spacing.spacing2};
    text-align: left;
    font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray300};
  }

  th {
    font-weight: ${({ theme }) => theme.typography.body1Bold.fontWeight};
    color: ${({ theme }) => theme.colors.semantic.textDefault};
  }
`;

type Props = {
  recipients: Recipient[];
  onEditClick: () => void;
};

const RecipientSection = ({ recipients, onEditClick }: Props) => {
  return (
    <Section>
      <RecipientHeader>
        <Label>받는 사람</Label>
        <EditButton type="button" onClick={onEditClick}>
          {recipients.length === 0 ? '+ 추가' : '수정'}
        </EditButton>
      </RecipientHeader>

      {recipients.length === 0 ? (
        <EmptyRecipientBox>
          <p>받는 사람이 없습니다.</p>
          <p>받는 사람을 추가해주세요.</p>
        </EmptyRecipientBox>
      ) : (
        <RecipientTable>
          <thead>
            <tr>
              <th>이름</th>
              <th>전화번호</th>
              <th>수량</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map((r) => (
              <tr key={`${r.phone}-${r.name}`}>
                <td>{r.name}</td>
                <td>{r.phone}</td>
                <td>{r.quantity}</td>
              </tr>
            ))}
          </tbody>
        </RecipientTable>
      )}
    </Section>
  );
};

export default RecipientSection;
