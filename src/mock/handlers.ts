import { http, HttpResponse } from 'msw';
import { Gift } from './Gift';

const mockProducts = Array(6).fill(Gift);

export const handlers = [
  http.get('http://localhost:3000/api/products/ranking*', () => {

    return HttpResponse.json(mockProducts);
  }),
];
