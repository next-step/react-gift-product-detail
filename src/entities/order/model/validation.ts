import { z } from 'zod';

export const orderSchema = z.object({
  message: z.string().min(1, '메시지를 입력해주세요.'),
  senderName: z.string().min(1, '보내는 사람 이름을 입력해주세요.'),
});

export type OrderSchema = z.infer<typeof orderSchema>; 