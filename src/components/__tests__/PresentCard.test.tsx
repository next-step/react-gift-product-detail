import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PresentCard from '@src/components/PresentCard';
import templates from '@src/assets/mock/order_card_template';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  senderSchema,
  type SenderSchema,
} from '@src/hooks/useOrderFormComplete';
import theme from '@src/styles/tokens/index';

const WrapperWithForm = ({
  defaultValues,
}: {
  defaultValues: Partial<SenderSchema>;
}) => {
  const methods = useForm<SenderSchema>({
    resolver: zodResolver(senderSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  return (
    <FormProvider {...methods}>
      <PresentCard />
      <button onClick={() => methods.trigger()}>검증</button>
    </FormProvider>
  );
};

describe('PresentCard 컴포넌트 테스트', () => {
  it('카드가 렌더링되어야 한다', () => {
    render(
      <WrapperWithForm
        defaultValues={{
          letter: templates[0].defaultTextMessage,
          senderName: '',
        }}
      />
    );
    const cards = screen.getAllByRole('img', { name: /번 메시지 카드$/ });
    expect(cards.length).toBe(templates.length + 1);
  });

  it('첫 번째 카드가 기본 선택 상태임을 확인한다', () => {
    render(
      <WrapperWithForm
        defaultValues={{
          letter: templates[0].defaultTextMessage,
          senderName: '',
        }}
      />
    );
    const cardBoxes = screen
      .getAllByRole('img', { name: /번 메시지 카드$/ })
      .map((img) => img.parentElement!);
    expect(cardBoxes[0]).toHaveStyle(
      `border: 3px solid ${theme.colors.blue500}`
    );
  });

  it('두 번째 카드 클릭 후 테두리 변경 확인한다', () => {
    render(
      <WrapperWithForm
        defaultValues={{
          letter: templates[0].defaultTextMessage,
          senderName: '',
        }}
      />
    );
    const cardBoxes = screen
      .getAllByRole('img', { name: /번 메시지 카드$/ })
      .map((img) => img.parentElement!);

    fireEvent.click(cardBoxes[1]);

    expect(cardBoxes[1]).toHaveStyle(
      `border: 3px solid ${theme.colors.blue500}`
    );
    expect(cardBoxes[0]).toHaveStyle(`border: 3px solid transparent`);
  });

  it('textarea에 기본 메시지가 설정되어 있어야 한다', () => {
    render(
      <WrapperWithForm
        defaultValues={{
          letter: templates[0].defaultTextMessage,
          senderName: '',
        }}
      />
    );
    const textarea = screen.getByPlaceholderText('메시지를 입력해 주세요');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue(templates[0].defaultTextMessage);
  });

  it('입력값 변경 시 textarea 값이 바뀌어야 한다', async () => {
    render(
      <WrapperWithForm
        defaultValues={{
          letter: templates[0].defaultTextMessage,
          senderName: '',
        }}
      />
    );
    const textarea = screen.getByPlaceholderText('메시지를 입력해 주세요');
    await userEvent.clear(textarea);
    await userEvent.type(textarea, '새로운 메시지입니다.');
    expect(textarea).toHaveValue('새로운 메시지입니다.');
  });
});
