import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };

    if (body.email === 'fail@fail.com') {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json({
      email: body.email,
      name: body.email.split('@')[0],
      authToken: '123456',
    });
  }),
];
