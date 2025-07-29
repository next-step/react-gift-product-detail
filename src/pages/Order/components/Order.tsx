import type React from "react";
import Card from "@/pages/Order/components/Card";
import Orderer from "@/pages/Order/components/Orderer";
import Receiver from "@/pages/Order/components/Receiver";
import Product from "@/pages/Order/components/Product";
import OrderBtn from "@/pages/Order/components/OrderBtn";
import ReceiverFieldModal from "@/pages/Order/components/ReceiverFieldModal";
import { FormProvider, useForm } from "react-hook-form";
import { orderCardMock } from "@/assets/orderCardMock";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { getCookieValue } from "@/utils/cookie";
import { AUTH_COOKIE_KEY_NAME } from "@/contexts/authContext";

interface OrderProps {
  children: React.ReactNode;
}

const ReceiverSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  phoneNumber: z
    .string()
    .min(1, "전화번호를 입력해주세요.")
    .regex(/^010\d{8}$/, "올바른 전화번호 형식이 아닙니다. 유효한 전화번호 형식(010xxxxxxxx)으로 입력해주세요."),
  quantity: z.number().min(1, "수량은 1개 이상이어야 합니다."),
});
const OrderFormSchema = z.object({
  messageCardId: z.number(),
  message: z.string().min(1, "메세지를 입력해주세요."),
  ordererName: z.string().min(1, "이름을 입력해주세요."),
  receivers: z
    .array(ReceiverSchema)
    .min(1, "받는 사람을 한 명 이상 추가해주세요.")
    .check((ctx) => {
      const phoneNumbers = new Set<string>();
      ctx.value.forEach((receiver, index) => {
        if (phoneNumbers.has(receiver.phoneNumber)) {
          ctx.issues.push({
            code: "custom",
            message: "중복된 전화번호가 있습니다.",
            input: ctx.value,
            path: [index, "phoneNumber"],
          });
        }
        phoneNumbers.add(receiver.phoneNumber);
      });
    }),
  productId: z.number(),
});

export type OrderFormType = z.infer<typeof OrderFormSchema>;
export type ReceiverType = z.infer<typeof ReceiverSchema>;

const defaultValues: OrderFormType = {
  messageCardId: orderCardMock[0].id,
  message: orderCardMock[0].defaultTextMessage,
  ordererName: getCookieValue(AUTH_COOKIE_KEY_NAME) || "",
  receivers: [],
  productId: 0,
};

const Order = ({ children }: OrderProps) => {
  const methods = useForm<OrderFormType>({ mode: "onSubmit", resolver: zodResolver(OrderFormSchema), defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default Order;

Order.Card = Card;
Order.Orderer = Orderer;
Order.Receiver = Receiver;
Order.Product = Product;
Order.Btn = OrderBtn;
Order.Modal = ReceiverFieldModal;
