import { http } from 'msw';

export const fetchAuthhandlers = [
  http.post('/api/login', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          email: 'hyemo@kakao.com',
          name: 'hyemo',
          authToken: 'dummy-token',
        },
      })
    );
  }),
];
