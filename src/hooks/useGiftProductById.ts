import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { GiftItem } from '../types/GiftItem';
import { useEffect } from 'react';
import { giftProductQueryOptions } from '../query/queryOptions';

const BASE_URL = 'http://localhost:3000';

export const fetchGiftProductById = async (
  id: number
): Promise<GiftItem> => {
  const res = await fetch(`${BASE_URL}/api/products/${id}/summary`);
  if (!res.ok) {
    const errorText = await res.text();
    const message =
      res.status >= 400 && res.status < 500
        ? errorText || '잘못된 요청입니다.'
        : '서버 오류가 발생했습니다.';
    throw new Error(message);
  }
  const data = await res.json();
  return data.data;
};

export const useGiftProductById = (id: number) => {
  const navigate = useNavigate();

  const query = useQuery<GiftItem, Error>(
    giftProductQueryOptions(id)
  );

  useEffect(() => {
    if (query.isError) {
      toast.error(
        query.error?.message ||
          '예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      );
      navigate('/', { replace: true });
    }
  }, [query.isError, query.error, navigate]);

  return query;
};
