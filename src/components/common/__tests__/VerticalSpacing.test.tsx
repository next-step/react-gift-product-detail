import { render } from '@testing-library/react';
import { VerticalSpacing } from '../VerticalSpacing';

describe('VerticalSpacing 컴포넌트', () => {
  it('children을 올바르게 렌더링하는지 확인합니다.', () => {
    const { getByText } = render(
      <VerticalSpacing size="16px">
        <div>테스트</div>
      </VerticalSpacing>
    );
    expect(getByText('테스트')).toBeInTheDocument();
  });

  it('size prop에 따라 올바른 height 스타일이 적용되는지 검증합니다.', () => {
    const { container } = render(<VerticalSpacing size="24px" />);
    expect(container.firstChild).toHaveStyle('height: 24px');
  });
});
