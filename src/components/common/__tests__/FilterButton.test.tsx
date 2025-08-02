import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FilterButton from '../FilterButton';

describe('FilterButton 컴포넌트', () => {
  it('기본 렌더링이 올바르게 되어야 한다', () => {
    render(<FilterButton onClick={() => {}}>테스트 버튼</FilterButton>);
    const button = screen.getByText('테스트 버튼');
    expect(button).toBeInTheDocument();
  });

  it('active prop이 true일 때 활성화 스타일이 적용되어야 한다', () => {
    render(
      <FilterButton active={true} onClick={() => {}}>
        활성화된 버튼
      </FilterButton>,
    );
    const button = screen.getByText('활성화된 버튼');
    expect(button).toHaveStyle('color: #3182f6');
    expect(button).toHaveStyle('font-weight: bold');
  });

  it('active prop이 false일 때 비활성화 스타일이 적용되어야 한다', () => {
    render(
      <FilterButton active={false} onClick={() => {}}>
        비활성화된 버튼
      </FilterButton>,
    );
    const button = screen.getByText('비활성화된 버튼');
    expect(button).toHaveStyle('color: #5a5a5a');
    expect(button).toHaveStyle('font-weight: normal');
  });

  it('onClick 이벤트가 올바르게 작동해야 한다', () => {
    const handleClick = vi.fn();
    render(<FilterButton onClick={handleClick}>클릭 테스트 버튼</FilterButton>);
    const button = screen.getByText('클릭 테스트 버튼');

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('children이 올바르게 렌더링되어야 한다', () => {
    render(
      <FilterButton onClick={() => {}}>
        <span>아이콘</span>
        <span>텍스트</span>
      </FilterButton>,
    );

    expect(screen.getByText('아이콘')).toBeInTheDocument();
    expect(screen.getByText('텍스트')).toBeInTheDocument();
  });
});
