import '@/__test__/setupTests'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TrendingGiftRanking from '@/features/Gift/components/TrendingGiftRanking/TrendingGiftRanking'

describe('실시간 급상승 선물랭킹', () => {
  const queryClient = new QueryClient()

  beforeEach(() => {
    // Given
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <TrendingGiftRanking />
        </QueryClientProvider>
      </MemoryRouter>
    )
  })

  it('상단 성별 탭이 화면에 표시된다', () => {
    const mainTab = screen.getByText(/남성이/i) // When
    expect(mainTab).toBeInTheDocument() // Then
  })

  it('하단 유형 탭이 화면에 표시된다', () => {
    const subTab = screen.getByText(/많이 선물한/i) // When
    expect(subTab).toBeInTheDocument() // Then
  })

  it('로딩 후 상품 리스트가 화면에 표시된다', async () => {
    const productName = await screen.findByText(/스트로베리 초콜릿 생크림/i) // When
    expect(productName).toBeInTheDocument() // Then
  })

  it('상품 클릭 시 상세 페이지로 이동한다', async () => {
    const product = await screen.findByText(/스트로베리 초콜릿 생크림/i)
    fireEvent.click(product) // When
    expect(product).toBeInTheDocument() // Then
  })
})
