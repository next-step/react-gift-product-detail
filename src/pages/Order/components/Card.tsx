import { orderCardMock } from "@/assets/orderCardMock";
import Divider from "@/components/common/Divider";
import styled from "@emotion/styled";
import { useFormContext } from "react-hook-form";
import type { OrderFormType } from "@/pages/Order/components/Order";
import TextAreaInputField from "@/components/form/TextareaInputField";

const Card = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<OrderFormType>();

  const cardId = watch("messageCardId");

  const selectedCard = orderCardMock.find((card) => card.id === cardId);

  const selectCard = (id: number) => {
    const newSelectedCard = orderCardMock.find((card) => card.id === id);
    if (newSelectedCard) {
      setValue("messageCardId", id);
      setValue("message", newSelectedCard.defaultTextMessage);
    }
  };
  return (
    <Container>
      <Divider spacing="0.75rem" />
      <CardList>
        {orderCardMock.map((card) => (
          <CardListItem
            key={card.id}
            selected={card.id === cardId}
            alt={`${card.id}번 메시지 카드`}
            src={card.thumbUrl}
            onClick={() => selectCard(card.id)}
          ></CardListItem>
        ))}
      </CardList>
      <SelectedCardWrapper>
        {selectedCard && <SelectedCard alt={`${cardId}번 메시지 카드`} src={selectedCard.imageUrl} />}
      </SelectedCardWrapper>
      <Divider spacing="2.5rem" />
      <TextAreaInputField
        placeholder="메시지를 입력해주세요."
        {...register("message")}
        errorMsg={errors.message?.message}
      />
      <Divider spacing="2rem" />
    </Container>
  );
};

export default Card;
const Container = styled.div`
  width: 100%;
`;

const CardList = styled.div`
  width: 100%;
  overflow: auto scroll;
  display: flex;
  flex-wrap: nowrap;
  gap: ${({ theme }) => theme.spacing.spacing3};
  padding: ${({ theme }) => theme.spacing.spacing4};
`;
const CardListItem = styled.img<{ selected: boolean }>`
  width: 5.125rem;
  height: 3.5rem;
  border-radius: 0.5rem;
  border: 3px solid ${({ selected, theme }) => (selected ? `${theme.color.kakaoBrownPressed}` : "transparent")};
`;
const SelectedCardWrapper = styled.div`
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing.spacing4};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SelectedCard = styled.img`
  max-width: 22.5rem;
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.2) 0 2.5rem 1.25rem -1.875rem;
`;
