import type {
  UserInfoData,
  UserInfoProps,
  GiftRankingItem,
  RankingApiProps,
  OrderInfoValues,
  ProductSummaryData,
  ThemeInfo,
  ThemeIdInfoData,
  ThemeIdItemsData,
  OrderResponseData,
} from '@/types';
import { apiClient } from './apiClient';

interface FetchOrderProps {
  orderData: OrderInfoValues;
  id: string;
}
interface fetchThemeIdItemsProps {
  index: number;
  currentCursor: number;
}

export const requests = {
  fetchUserInfos: ({ username, password }: UserInfoProps): Promise<UserInfoData> => {
    const data = {
      email: username.value,
      password: password.value,
    };
    return apiClient.post('/api/login', data);
  },
  fetchOrder: ({ orderData, id }: FetchOrderProps): Promise<OrderResponseData> => {
    const { message, name, receiverInfos } = orderData;
    const data = {
      productId: Number(id),
      message: message,
      messageCardId: 'card123',
      ordererName: name,
      receivers: receiverInfos,
    };
    return apiClient.post('/api/order', data);
  },
  fetchSummary: (id: string): Promise<ProductSummaryData> => {
    return apiClient.get(`/api/products/${id}/summary`);
  },
  fetchRanking: ({
    activeGeneration,
    activeFilter,
  }: RankingApiProps): Promise<GiftRankingItem[]> => {
    return apiClient.get(
      `/api/products/ranking?targetType=${activeGeneration}&rankType=${activeFilter}`
    );
  },
  fetchTheme: (): Promise<ThemeInfo[]> => apiClient.get('/api/themes'),
  fetchThemeIdInfo: (index: number): Promise<ThemeIdInfoData> =>
    apiClient.get(`/api/themes/${index}/info`),
  fetchThemeIdItems: ({
    index,
    currentCursor,
  }: fetchThemeIdItemsProps): Promise<ThemeIdItemsData> =>
    apiClient.get(`/api/themes/${index}/products?cursor=${currentCursor}`),
};
