import { http } from 'msw'

export const handlers = [
  http.post('https://localhost:3000/api/login', async ({ request }) => {
    const body = await request.json()

    await new Promise((r) => setTimeout(r, 300)) // 300ms 지연

    const response = {
      data: {
        email: 'test@kakao.com',
        name: '홍길동',
        authToken: 'token',
      },
    }

    return Response.json(response, { status: 200 })
  }),
]
