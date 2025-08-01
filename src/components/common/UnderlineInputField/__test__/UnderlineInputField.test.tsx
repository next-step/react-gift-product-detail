import { renderWithTheme } from '@test/utils/renderWithTheme';
import { UnderlineInputField } from '../UnderlineInputField';
import { screen } from '@testing-library/react';
import { theme } from '@styles/tokens';
import userEvent from '@testing-library/user-event';

describe('', () => {
  it('렌더링 및 placeholder 테스트', () => {
    renderWithTheme(<UnderlineInputField placeholder="이름" />);
    expect(screen.getByPlaceholderText('이름')).toBeInTheDocument();
  });

  it('error message 출력 테스트', () => {
    renderWithTheme(<UnderlineInputField message="message" />);
    expect(screen.getByText('message')).toBeInTheDocument();
  });

  it('error props가 true일 때 스타일 테스트', () => {
    renderWithTheme(
      <UnderlineInputField error={true} placeholder="에러 있음" />
    );
    const input = screen.getByPlaceholderText('에러 있음');
    expect(input).toHaveStyle(
      `border-bottom: 1px solid ${theme.colors.semantic.critical}`
    );
  });

  it('type prop 테스트', () => {
    renderWithTheme(
      <UnderlineInputField type="password" placeholder="비밀번호" />
    );
    const input = screen.getByPlaceholderText('비밀번호');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('사용자 입력 테스트', async () => {
    renderWithTheme(<UnderlineInputField />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Hello');
    expect((input as HTMLInputElement).value).toBe('Hello');
  });

  it('HTML 속성 전달 테스트', () => {
    renderWithTheme(<UnderlineInputField name="username" id="user-id" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'username');
    expect(input).toHaveAttribute('id', 'user-id');
  });

  it('disabled 상태 테스트', () => {
    renderWithTheme(<UnderlineInputField disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });
});
