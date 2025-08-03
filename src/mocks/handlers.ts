import { http, HttpResponse } from 'msw';

interface LoginRequestBody {
  email?: string;
  password?: string;
}

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    const body = (await request.json()) as LoginRequestBody;
    if (body.email === 'test@kakao.com' && body.password === 'password123') {
      return HttpResponse.json({ accessToken: 'fake-token' }, { status: 200 });
    } else {
      return HttpResponse.json({ message: '로그인 실패' }, { status: 401 });
    }
  }),
];
