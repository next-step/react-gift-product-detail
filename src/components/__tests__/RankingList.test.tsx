import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { http, HttpResponse, delay } from 'msw'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import RankingList from '../RankingList'
import { server } from '../../setupTests'

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </MemoryRouter>,
  )
}

const mockProducts = Array.from({ length: 7 }).map((_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  imageURL: `image${i + 1}.jpg`,
  price: {
    basicPrice: 1000,
    discountRate: 0,
    sellingPrice: 1000,
  },
  brandInfo: {
    id: i + 1,
    name: `Brand ${i + 1}`,
    imageURL: '',
  },
}))

describe('RankingList', () => {
  it('로딩 상태에서 skeleton을 보여준다', async () => {
    server.use(
      http.get(/\/api\/products\/ranking/, async () => {
        await delay(100)
        return HttpResponse.json(mockProducts)
      }),
    )
    const { container } = renderWithClient(<RankingList />)
    expect(screen.queryByText('Product 1')).not.toBeInTheDocument()
    expect(container.querySelectorAll('div').length).toBeGreaterThan(0)
    await screen.findByText('Product 1')
  })

  it('API 에러 시 메시지를 표시한다', async () => {
    server.use(
      http.get(/\/api\/products\/ranking/, () =>
        HttpResponse.json({}, { status: 500 }),
      ),
    )
    renderWithClient(<RankingList />)
    await screen.findByText('상품 목록이 없습니다.')
  })

  it('정상적으로 상품 목록을 표시하고 더보기 버튼을 동작시킨다', async () => {
    server.use(
      http.get(/\/api\/products\/ranking/, () =>
        HttpResponse.json(mockProducts),
      ),
    )
    renderWithClient(<RankingList />)
    expect(await screen.findByText('Product 1')).toBeInTheDocument()
    expect(screen.queryByText('Product 7')).not.toBeInTheDocument()
    const button = screen.getByRole('button', { name: '더보기' })
    fireEvent.click(button)
    await screen.findByText('Product 7')
    expect(screen.getByRole('button', { name: '접기' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '접기' }))
    await waitFor(() =>
      expect(screen.queryByText('Product 7')).not.toBeInTheDocument(),
    )
    expect(screen.getByRole('button', { name: '더보기' })).toBeInTheDocument()
  })
})