import { http, HttpResponse } from 'msw';

export const fetchAuthhandlers = [
  http.post('http://localhost/api/login', async ({ request }) => {
    const body = await request.json();

    const { email, password } = body;
    if (!email.endsWith('@kakao.com')) {
      return HttpResponse.json({ message: '잘못된 이메일 형식' }, { status: 400 });
    }
    return HttpResponse.json({
      data: {
        email: 'user@kakao.com',
        name: 'user',
        authToken: 'dummy-token',
      },
    });
  }),
];
