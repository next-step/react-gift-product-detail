import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { MESSAGE_CARD_LIST } from "@/mocks/messagecard_mock";
import type { MessageCard } from "@/mocks/messagecard_mock";
import type { FullOrderFormValues } from "@/utils/validator";

export function useMessageCard() {
  const { setValue } = useFormContext<FullOrderFormValues>();
  const [selectedCard, setSelectedCard] = useState<MessageCard>(
    MESSAGE_CARD_LIST[0]
  );

  useEffect(() => {
    setValue("message", MESSAGE_CARD_LIST[0].defaultTextMessage);
    setValue("messageCardId", String(MESSAGE_CARD_LIST[0].id));
  }, [setValue]);

  const selectMessageCard = (card: MessageCard) => {
    setSelectedCard(card);
    setValue("message", card.defaultTextMessage);
    setValue("messageCardId", String(card.id));
  };

  return {
    selectedCard,
    selectMessageCard,
  };
}
