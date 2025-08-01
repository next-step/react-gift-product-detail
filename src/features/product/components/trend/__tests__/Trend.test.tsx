import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@emotion/react'
import { theme } from '@/shared/styles'

// * React Router 모킹
const mockSearchParams = new URLSearchParams()
const mockSetSearchParams = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useSearchParams: () => [mockSearchParams, mockSetSearchParams],
  }
})

// * React Query 모킹 - 간단하게 처리
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query')
  return {
    ...actual,
    useSuspenseQuery: vi.fn().mockReturnValue({
      data: [
        {
          id: 11712379,
          name: '부드러운 고구마 라떼 케이크',
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250218142602_030fce0196af42189694554c03a54fbb.jpg',
          price: {
            basicPrice: 31000,
            sellingPrice: 26350,
            discountRate: 15,
          },
          brandInfo: {
            id: 27,
            name: '뚜레쥬르',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20250331162129_e8de4166853848729c5abad9834405b0.jpg',
          },
        },
        {
          id: 10349024,
          name: '5만원권',
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20200924101152_16bb00f28a984b03a2efbdb9cec990d1.jpg',
          price: {
            basicPrice: 50000,
            sellingPrice: 50000,
            discountRate: 0,
          },
          brandInfo: {
            id: 4784,
            name: '성심당',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20200923160929_0ad3cff2a7564c4a967e30670b179a91.jpg',
          },
        },
        {
          id: 11477185,
          name: '스트로베리 요거트 생크림',
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250408081816_d201654a475e46bd8a480849de51ea30.jpg',
          price: {
            basicPrice: 29000,
            sellingPrice: 29000,
            discountRate: 0,
          },
          brandInfo: {
            id: 27,
            name: '뚜레쥬르',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20250331162129_e8de4166853848729c5abad9834405b0.jpg',
          },
        },
        {
          id: 11526708,
          name: '떠먹는 티라미수 + 아메리카노 R 2잔',
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250324154718_23d0ce897922417e83a7ac72ecfadca8.jpg',
          price: {
            basicPrice: 16200,
            sellingPrice: 16200,
            discountRate: 0,
          },
          brandInfo: {
            id: 33,
            name: '투썸플레이스',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
          },
        },
      ],
    }),
  }
})

// * API 서비스 모킹
vi.mock('@/api/services', () => ({
  fetchProductRankList: vi.fn().mockResolvedValue([]),
}))

// * 컴포넌트 모킹 - 간단하게 처리
vi.mock('./TrendFilter', () => ({
  TrendFilter: ({
    onTargetTypeChange,
    onRankTypeChange,
  }: {
    onTargetTypeChange: (type: string) => void
    onRankTypeChange: (type: string) => void
  }) => (
    <div data-testid="trend-filter">
      <button onClick={() => onTargetTypeChange('ALL')}>전체</button>
      <button onClick={() => onTargetTypeChange('MALE')}>남성</button>
      <button onClick={() => onTargetTypeChange('FEMALE')}>여성</button>
      <button onClick={() => onRankTypeChange('MANY_WISH')}>많이 담긴</button>
      <button onClick={() => onRankTypeChange('MANY_RECEIVE')}>많이 주문된</button>
    </div>
  ),
}))

vi.mock('./ProductItem', () => ({
  ProductItem: ({ product, index }: { product: { id: number; name: string }; index: number }) => (
    <div data-testid={`product-item-${product.id}`}>
      {product.name} (순위: {index + 1})
    </div>
  ),
}))

vi.mock('@/shared/components/ErrorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="error-boundary">{children}</div>
  ),
}))

import { Trend } from '../Trend'

// * 테스트용 Provider 래퍼
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

describe('Trend 컴포넌트', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSearchParams.delete('targetType')
    mockSearchParams.delete('rankType')
  })

  /**
   * 시나리오: Trend 컴포넌트가 정상적으로 렌더링된다.
   * - Given: Trend 컴포넌트가 마운트되었을 때
   * - Then: 제목, 필터, 상품 목록이 보여야 한다.
   */
  it('Trend 컴포넌트 기본 렌더링', () => {
    // Given
    render(<Trend />, { wrapper: TestWrapper })

    // Then
    expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument()
    expect(screen.getByText('전체')).toBeInTheDocument()
    expect(screen.getByText('여성이')).toBeInTheDocument()
    expect(screen.getByText('남성이')).toBeInTheDocument()
    expect(screen.getByText('청소년이')).toBeInTheDocument()
    expect(screen.getByText('부드러운 고구마 라떼 케이크')).toBeInTheDocument()
    expect(screen.getByText('5만원권')).toBeInTheDocument()
    expect(screen.getByText('스트로베리 요거트 생크림')).toBeInTheDocument()
  })

  /**
   * 시나리오: 상품 아이템이 올바른 순위로 렌더링된다.
   * - Given: 상품 목록이 주어졌을 때
   * - When: Trend 컴포넌트가 렌더링되면
   * - Then: 각 상품이 올바른 순위와 함께 표시된다.
   */
  it('상품 아이템이 올바른 순위로 렌더링', () => {
    // Given
    render(<Trend />, { wrapper: TestWrapper })

    // When & Then
    expect(screen.getByText('부드러운 고구마 라떼 케이크')).toBeInTheDocument()
    expect(screen.getByText('5만원권')).toBeInTheDocument()
    expect(screen.getByText('스트로베리 요거트 생크림')).toBeInTheDocument()
    // 순위도 각각 존재하는지 확인
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  /**
   * 시나리오: 실제 필터 버튼들이 렌더링된다.
   * - Given: Trend 컴포넌트가 렌더링되었을 때
   * - Then: 실제 필터 버튼들이 표시된다.
   */
  it('실제 필터 버튼들이 렌더링', () => {
    // Given
    render(<Trend />, { wrapper: TestWrapper })

    // Then
    expect(screen.getByText('전체')).toBeInTheDocument()
    expect(screen.getByText('여성이')).toBeInTheDocument()
    expect(screen.getByText('남성이')).toBeInTheDocument()
    expect(screen.getByText('청소년이')).toBeInTheDocument()
    expect(screen.getByText('받고 싶어한')).toBeInTheDocument()
    expect(screen.getByText('많이 선물한')).toBeInTheDocument()
    expect(screen.getByText('위시로 받은')).toBeInTheDocument()
  })

  /**
   * 시나리오: 필터 변경 시 URL 파라미터가 업데이트된다.
   * - Given: Trend 컴포넌트가 렌더링된 상태에서
   * - When: 필터 버튼을 클릭하면
   * - Then: URL 파라미터가 업데이트된다.
   */
  it('필터 변경 시 URL 파라미터 업데이트', async () => {
    // Given
    render(<Trend />, { wrapper: TestWrapper })
    const maleButton = screen.getByText('남성이').closest('button')
    const manyReceiveButton = screen.getByText('많이 선물한').closest('button')

    // When
    fireEvent.click(maleButton!)
    fireEvent.click(manyReceiveButton!)

    // Then
    await waitFor(() => {
      expect(mockSetSearchParams).toHaveBeenCalled()
    })
  })

  /**
   * 시나리오: 키보드로 모든 필터 버튼에 접근할 수 있다.
   * - Given: Trend 컴포넌트가 렌더링된 상태에서
   * - When: 각 필터 버튼에 포커스를 이동시키면
   * - Then: 모든 버튼에 포커스가 가능하다.
   */
  it('키보드로 모든 필터 버튼에 접근 가능', () => {
    // Given
    render(<Trend />, { wrapper: TestWrapper })
    const maleButton = screen.getByText('남성이').closest('button')
    const femaleButton = screen.getByText('여성이').closest('button')
    const teenButton = screen.getByText('청소년이').closest('button')
    const manyWishButton = screen.getByText('받고 싶어한').closest('button')

    // When & Then
    maleButton!.focus()
    expect(maleButton).toHaveFocus()

    femaleButton!.focus()
    expect(femaleButton).toHaveFocus()

    teenButton!.focus()
    expect(teenButton).toHaveFocus()

    manyWishButton!.focus()
    expect(manyWishButton).toHaveFocus()
  })

  /**
   * 시나리오: 컴포넌트가 시맨틱하게 마크업된다.
   * - Given: Trend 컴포넌트가 렌더링되었을 때
   * - When: DOM 구조를 확인하면
   * - Then: section 태그로 감싸져 있어야 한다.
   */
  it('시맨틱 마크업 구조 확인', () => {
    // Given & When
    render(<Trend />, { wrapper: TestWrapper })

    // Then
    const section = screen.getByText('실시간 급상승 선물랭킹').closest('section')
    expect(section).toBeInTheDocument()
  })
})
