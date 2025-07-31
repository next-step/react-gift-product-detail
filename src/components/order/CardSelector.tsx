import styled from '@emotion/styled';
import { messageCardMockData } from '@/mocks/messageCards';
import type { UseFormSetValue } from 'react-hook-form';
import type { FormValues } from '@/types/orderForm';

const Wrapper = styled.div`
  display: flex;
  overflow-x: auto;
  gap: ${({ theme }) => theme.spacing.spacing2};
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
`;

const Thumb = styled.img<{ isSelected: boolean }>`
  width: 72px;
  height: 72px;
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  border: 2px solid
    ${({ isSelected, theme }) => (isSelected ? theme.colors.semantic.kakaoYellow : 'transparent')};
  cursor: pointer;
`;

type Props = {
  selectedCardId: number;
  setSelectedCardId: (id: number) => void;
  setValue: UseFormSetValue<FormValues>;
};

const CardSelector = ({ selectedCardId, setSelectedCardId, setValue }: Props) => (
  <Wrapper>
    {messageCardMockData.map((card) => (
      <Thumb
        key={card.id}
        src={card.thumbUrl}
        onClick={() => {
          setSelectedCardId(card.id);
          setValue('message', card.defaultTextMessage);
        }}
        isSelected={selectedCardId === card.id}
      />
    ))}
  </Wrapper>
);

export default CardSelector;
