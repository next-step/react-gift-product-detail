import { screen } from '@testing-library/react';
import OrderField from '@/components/common/OrderField';
import { describe, it, expect } from 'vitest';
import { renderCustom } from '@/tests/testUtils';

describe('OrderField', () => {
  it('input 필드와 label이 렌더링되어야 한다.', () => {
    // Given: 기본 props(label, id, placeholder)를 가진 input 필드를 렌더링할 때
    renderCustom(<OrderField id="sender" label="보내는 사람" placeholder="이름을 입력하세요." />);

    // Then: label과 placeholder가 화면에 보여야 한다.
    expect(screen.getByLabelText('보내는 사람')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('이름을 입력하세요.')).toBeInTheDocument();
  });

  it('textarea로 렌더링되면 textarea 요소가 나타나야 한다."', () => {
    // Given: textarea 타입으로 OrderField를 렌더링할 때
    renderCustom(
      <OrderField id="message" label="메시지" placeholder="메시지를 입력하세요." as="textarea" />
    );

    // Then: textarea가 있어야 하고, input이 아니어야 한다.
    const textarea = screen.getByPlaceholderText('메시지를 입력하세요.');
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('error props가 주어지면 해당 메시지가 보여야 한다.', () => {
    // Given: error 메시지가 전달되었을 때
    renderCustom(
      <OrderField
        id="sender"
        label="보내는 사람"
        placeholder="이름을 입력하세요."
        error="이름은 필수입니다."
      />
    );

    // Then: 에러 메시지가 렌더링되어야 한다
    expect(screen.getByText('이름은 필수입니다.')).toBeInTheDocument();
  });

  it('error props가 주어지지 않으면 해당 메시지가 보이면 안된다.', () => {
    // Given: error 메시지가 전달되지 않았을 때
    renderCustom(<OrderField id="sender" label="보내는 사람" placeholder="이름을 입력하세요." />);

    // Then: 에러 메시지가 없어야 한다
    expect(screen.queryByText('이름은 필수입니다.')).not.toBeInTheDocument();
  });
});
