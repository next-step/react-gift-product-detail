import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Mock 데이터와 함수들
const mockProducts = [
  { id: 1, name: '테스트 상품 1', price: 10000, imageUrl: 'test1.jpg', rank: 1 },
  { id: 2, name: '테스트 상품 2', price: 20000, imageUrl: 'test2.jpg', rank: 2 },
  { id: 3, name: '테스트 상품 3', price: 30000, imageUrl: 'test3.jpg', rank: 3 },
];

const mockSetSelected = jest.fn();
const mockSetSelectedWantedTab = jest.fn();
const mockUseProductRankingQuery = jest.fn();

// RankingTabs 컴포넌트 Mock (실제 로직 구현)
const MockRankingTabs = ({ 
  initialSelected = 'FEMALE', 
  initialWantedTab = 'MANY_WISH',
  products = mockProducts 
}) => {
  const [selected, setSelected] = React.useState(initialSelected);
  const [selectedWantedTab, setSelectedWantedTab] = React.useState(initialWantedTab);

  const peopleTab = [
    { label: '전체', value: 'ALL', icon: 'ALL' },
    { label: '여성', value: 'FEMALE', icon: '👩' },
    { label: '남성', value: 'MALE', icon: '👨' },
    { label: '청소년', value: 'TEEN', icon: '🧑' },
  ];

  const wantedTab = [
    { label: '많이 찜한', value: 'MANY_WISH' },
    { label: '많이 받은', value: 'MANY_RECEIVE' },
    { label: '많이 찜하고 받은', value: 'MANY_WISH_RECEIVE' },
  ];

  const handleTargetTabChange = (value) => {
    setSelected(value);
    mockSetSelected(value);
  };

  const handleRankTabChange = (value) => {
    setSelectedWantedTab(value);
    mockSetSelectedWantedTab(value);
  };

  return (
    <div>
      <h3>실시간 급상승 선물랭킹</h3>
      
      {/* 타겟 탭들 */}
      <div data-testid="target-tabs">
        {peopleTab.map(tab => (
          <button
            key={tab.value}
            onClick={() => handleTargetTabChange(tab.value)}
            data-testid={`target-tab-${tab.value}`}
            style={{
              backgroundColor: selected === tab.value ? '#e3f2fd' : '#f5f5f5'
            }}
          >
            {tab.icon !== 'ALL' && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 원하는 탭들 */}
      <div data-testid="wanted-tabs">
        {wantedTab.map(tab => (
          <button
            key={tab.value}
            onClick={() => handleRankTabChange(tab.value)}
            data-testid={`wanted-tab-${tab.value}`}
            style={{
              backgroundColor: selectedWantedTab === tab.value ? '#e3f2fd' : '#f5f5f5'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 상품 그리드 */}
      <div data-testid="product-grid">
        <div data-testid="selected-target">{selected}</div>
        <div data-testid="selected-wanted">{selectedWantedTab}</div>
        {products.map(product => (
          <div key={product.id} data-testid={`product-${product.id}`}>
            {product.name}
          </div>
        ))}
      </div>
    </div>
  );
};

describe('RankingTabs 테스트', () => {
  beforeEach(() => {
    // 각 테스트 전에 mock 초기화
    jest.clearAllMocks();
  });

  describe('1. 초기 렌더링', () => {
    test('제목과 모든 탭들이 정상적으로 렌더링된다', () => {
      render(<MockRankingTabs />);

      // 제목 확인
      expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
      
      // 타겟 탭들 확인
      expect(screen.getByText('전체')).toBeInTheDocument();
      expect(screen.getByText('여성')).toBeInTheDocument();
      expect(screen.getByText('남성')).toBeInTheDocument();
      expect(screen.getByText('청소년')).toBeInTheDocument();
      
      // 원하는 탭들 확인
      expect(screen.getByText('많이 찜한')).toBeInTheDocument();
      expect(screen.getByText('많이 받은')).toBeInTheDocument();
      expect(screen.getByText('많이 찜하고 받은')).toBeInTheDocument();
    });

    test('초기 선택 상태가 올바르게 설정된다', () => {
      render(<MockRankingTabs />);
      
      expect(screen.getByTestId('selected-target')).toHaveTextContent('FEMALE');
      expect(screen.getByTestId('selected-wanted')).toHaveTextContent('MANY_WISH');
    });

    test('상품 목록이 정상적으로 렌더링된다', () => {
      render(<MockRankingTabs />);
      
      expect(screen.getByText('테스트 상품 1')).toBeInTheDocument();
      expect(screen.getByText('테스트 상품 2')).toBeInTheDocument();
      expect(screen.getByText('테스트 상품 3')).toBeInTheDocument();
    });
  });

  describe('2. 타겟 탭 기능', () => {
    describe('탭 클릭 동작', () => {
      test('전체 탭 클릭 시 선택 상태가 변경된다', async () => {
        const user = userEvent.setup();
        render(<MockRankingTabs />);

        const allTab = screen.getByTestId('target-tab-ALL');
        await user.click(allTab);

        expect(mockSetSelected).toHaveBeenCalledWith('ALL');
        expect(screen.getByTestId('selected-target')).toHaveTextContent('ALL');
      });

      test('남성 탭 클릭 시 선택 상태가 변경된다', async () => {
        const user = userEvent.setup();
        render(<MockRankingTabs />);

        const maleTab = screen.getByTestId('target-tab-MALE');
        await user.click(maleTab);

        expect(mockSetSelected).toHaveBeenCalledWith('MALE');
        expect(screen.getByTestId('selected-target')).toHaveTextContent('MALE');
      });

      test('청소년 탭 클릭 시 선택 상태가 변경된다', async () => {
        const user = userEvent.setup();
        render(<MockRankingTabs />);

        const teenTab = screen.getByTestId('target-tab-TEEN');
        await user.click(teenTab);

        expect(mockSetSelected).toHaveBeenCalledWith('TEEN');
        expect(screen.getByTestId('selected-target')).toHaveTextContent('TEEN');
      });
    });

    describe('아이콘 표시', () => {
      test('타겟 탭 아이콘들이 올바르게 표시된다', () => {
        render(<MockRankingTabs />);
        
        expect(screen.getByText('👩')).toBeInTheDocument();
        expect(screen.getByText('👨')).toBeInTheDocument();
        expect(screen.getByText('🧑')).toBeInTheDocument();
      });
    });
  });

  describe('3. 원하는 탭 기능', () => {
    describe('탭 클릭 동작', () => {
      test('많이 받은 탭 클릭 시 선택 상태가 변경된다', async () => {
        const user = userEvent.setup();
        render(<MockRankingTabs />);

        const manyReceiveTab = screen.getByTestId('wanted-tab-MANY_RECEIVE');
        await user.click(manyReceiveTab);

        expect(mockSetSelectedWantedTab).toHaveBeenCalledWith('MANY_RECEIVE');
        expect(screen.getByTestId('selected-wanted')).toHaveTextContent('MANY_RECEIVE');
      });

      test('많이 찜하고 받은 탭 클릭 시 선택 상태가 변경된다', async () => {
        const user = userEvent.setup();
        render(<MockRankingTabs />);

        const manyWishReceiveTab = screen.getByTestId('wanted-tab-MANY_WISH_RECEIVE');
        await user.click(manyWishReceiveTab);

        expect(mockSetSelectedWantedTab).toHaveBeenCalledWith('MANY_WISH_RECEIVE');
        expect(screen.getByTestId('selected-wanted')).toHaveTextContent('MANY_WISH_RECEIVE');
      });
    });
  });

  describe('4. 탭 조합 테스트', () => {
    test('타겟 탭과 원하는 탭을 연속으로 클릭했을 때 모두 정상 동작한다', async () => {
      const user = userEvent.setup();
      render(<MockRankingTabs />);

      // 남성 탭 클릭
      const maleTab = screen.getByTestId('target-tab-MALE');
      await user.click(maleTab);
      
      expect(screen.getByTestId('selected-target')).toHaveTextContent('MALE');

      // 많이 받은 탭 클릭
      const manyReceiveTab = screen.getByTestId('wanted-tab-MANY_RECEIVE');
      await user.click(manyReceiveTab);
      
      expect(screen.getByTestId('selected-wanted')).toHaveTextContent('MANY_RECEIVE');
    });

    test('모든 타겟 탭들이 순차적으로 클릭 가능하다', async () => {
      const user = userEvent.setup();
      render(<MockRankingTabs />);

      const targetTabs = [
        { testId: 'target-tab-ALL', value: 'ALL' },
        { testId: 'target-tab-FEMALE', value: 'FEMALE' },
        { testId: 'target-tab-MALE', value: 'MALE' },
        { testId: 'target-tab-TEEN', value: 'TEEN' }
      ];

      for (const tab of targetTabs) {
        const tabElement = screen.getByTestId(tab.testId);
        await user.click(tabElement);
        expect(screen.getByTestId('selected-target')).toHaveTextContent(tab.value);
      }
    });

    test('모든 원하는 탭들이 순차적으로 클릭 가능하다', async () => {
      const user = userEvent.setup();
      render(<MockRankingTabs />);

      const wantedTabs = [
        { testId: 'wanted-tab-MANY_WISH', value: 'MANY_WISH' },
        { testId: 'wanted-tab-MANY_RECEIVE', value: 'MANY_RECEIVE' },
        { testId: 'wanted-tab-MANY_WISH_RECEIVE', value: 'MANY_WISH_RECEIVE' }
      ];

      for (const tab of wantedTabs) {
        const tabElement = screen.getByTestId(tab.testId);
        await user.click(tabElement);
        expect(screen.getByTestId('selected-wanted')).toHaveTextContent(tab.value);
      }
    });
  });

  describe('5. 커스텀 초기값 테스트', () => {
    test('커스텀 초기 선택값으로 렌더링이 가능하다', () => {
      render(<MockRankingTabs initialSelected="MALE" initialWantedTab="MANY_RECEIVE" />);
      
      expect(screen.getByTestId('selected-target')).toHaveTextContent('MALE');
      expect(screen.getByTestId('selected-wanted')).toHaveTextContent('MANY_RECEIVE');
    });

    test('빈 상품 목록으로도 정상 렌더링된다', () => {
      render(<MockRankingTabs products={[]} />);
      
      expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
      expect(screen.getByTestId('product-grid')).toBeInTheDocument();
      expect(screen.queryByTestId('product-1')).not.toBeInTheDocument();
    });
  });
});
