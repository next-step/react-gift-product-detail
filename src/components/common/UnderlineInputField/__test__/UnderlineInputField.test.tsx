import { renderWithTheme } from '@test/utils/renderWithTheme';
import { UnderlineInputField } from '../UnderlineInputField';
import { screen } from '@testing-library/react';
import { theme } from '@styles/tokens';
import userEvent from '@testing-library/user-event';

describe('UnderlineInputField', () => {
  it('placeholder test', () => {
    renderWithTheme(<UnderlineInputField placeholder="이름" />);
    expect(screen.getByPlaceholderText('이름')).toBeInTheDocument();
  });

  it('renders error message if message prop is provided', () => {
    renderWithTheme(<UnderlineInputField message="message" />);
    expect(screen.getByText('message')).toBeInTheDocument();
  });

  it('applies error style when error is true', () => {
    renderWithTheme(
      <UnderlineInputField error={true} placeholder="에러 있음" />
    );
    const input = screen.getByPlaceholderText('에러 있음');
    expect(input).toHaveStyle(
      `border-bottom: 1px solid ${theme.colors.semantic.critical}`
    );
  });

  it('applies correct input type', () => {
    renderWithTheme(
      <UnderlineInputField type="password" placeholder="비밀번호" />
    );
    const input = screen.getByPlaceholderText('비밀번호');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('accepts user input', async () => {
    renderWithTheme(<UnderlineInputField />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Hello');
    expect((input as HTMLInputElement).value).toBe('Hello');
  });
});
