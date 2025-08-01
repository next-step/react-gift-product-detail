import { orderHandlers } from "./order";
import { productHandlers } from "./product";
import { authHandlers } from "@/__mocks__/auth";
import { giftHandlers } from "@/__mocks__/gifts";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const handlers = [...authHandlers, ...orderHandlers, ...productHandlers, ...giftHandlers];
