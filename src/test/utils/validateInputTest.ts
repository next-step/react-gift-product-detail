import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// 필요한 요소들을 인자로 받아 input 필드에 입력하고 에러 텍스트 검증
export const validateInputTest = async (
  expectedError: string,
  input: HTMLElement,
  value?: string
) => {
  await userEvent.clear(input); // 현재는 필요없지만 재사용성을 높이기 위해 작성
  if (value) {
    await userEvent.type(input, value);
  } else {
    await userEvent.click(input);
  }

  await userEvent.tab();

  expect(await screen.findByText(expectedError)).toBeInTheDocument();
};
