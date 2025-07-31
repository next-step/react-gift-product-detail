import styled from '@emotion/styled';
import OrderField from '@/components/common/OrderField';
import type { UseFormRegisterReturn } from 'react-hook-form';

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.spacing5};
`;

const Note = styled.p`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  color: ${({ theme }) => theme.colors.semantic.textSub};
  margin-top: ${({ theme }) => theme.spacing.spacing1};
`;

type Props = {
  register: UseFormRegisterReturn;
  error?: string;
  showNote?: boolean;
};

const SenderField = ({ register, error, showNote }: Props) => {
  return (
    <Section>
      <OrderField
        id="sender"
        label="보내는 사람"
        placeholder="이름을 입력하세요."
        {...register}
        error={error}
      />
      {showNote && <Note>* 실제 선물 발송 시 발신자 이름으로 반영되는 정보입니다.</Note>}
    </Section>
  );
};

export default SenderField;
