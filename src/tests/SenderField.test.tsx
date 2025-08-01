import { screen } from '@testing-library/react';
import SenderField from '@/components/order/SenderField';
import { useForm } from 'react-hook-form';
import { renderCustom } from '@/tests/testUtils';

describe('SenderField', () => {
  const TestWrapper = ({ error, showNote }: { error?: string; showNote?: boolean }) => {
    const { register } = useForm();
    return <SenderField register={register('sender')} error={error} showNote={showNote} />;
  };

  it('보내는 사람 input 필드가 렌더링되어야 한다.', () => {
    // Given: SenderField 컴포넌트를 렌더링했을 때
    renderCustom(<TestWrapper />);

    // Then: "보내는 사람" label과 placeholder가 존재해야 한다.
    expect(screen.getByLabelText('보내는 사람')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('이름을 입력하세요.')).toBeInTheDocument();
  });

  it('error props가 있으면 해당 메시지가 렌더링되어야 한다.', () => {
    // Given: error 메시지를 포함한 상태로 렌더링할 때
    renderCustom(<TestWrapper error="이름은 필수입니다." />);

    // Then: 에러 메시지가 표시되어야 한다.
    expect(screen.getByText('이름은 필수입니다.')).toBeInTheDocument();
  });

  it('showNote가 true면 안내 메시지가 보여야 한다.', () => {
    // Given: showNote가 true인 상태로 렌더링할 때
    renderCustom(<TestWrapper showNote />);

    // Then: 안내 문구가 보여야 한다.
    expect(
      screen.getByText(/실제 선물 발송 시 발신자 이름으로 반영되는 정보입니다./i)
    ).toBeInTheDocument();
  });

  it('showNote가 false면 안내 메시지가 보이면 안된다.', () => {
    // Given: showNote가 false인 상태로 렌더링할 때
    renderCustom(<TestWrapper showNote={false} />);

    // Then: 안내 문구가 없어야 한다.
    expect(
      screen.queryByText(/실제 선물 발송 시 발신자 이름으로 반영되는 정보입니다./i)
    ).not.toBeInTheDocument();
  });
});
