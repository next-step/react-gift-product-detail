import { http, HttpResponse } from 'msw';

export const loginHandlers = [
  http.post('http://localhost:3000/api/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    const { email, password } = body;

    if (email === 'test@example.com' && password === '12345678') {
      return HttpResponse.json({
        data: {
          email: 'test@example.com',
          name: '테스트 사용자',
          authToken: 'dummy-token',
        },
      });
    }

    return new HttpResponse(
      JSON.stringify({
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
      }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }),
];
