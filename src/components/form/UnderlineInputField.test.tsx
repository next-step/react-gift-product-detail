import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import theme from "@/styles/theme/theme";
import UnderlineInputField from "@/components/form/UnderlineInputField";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("UnderlineInputField 기능 테스트", () => {
  afterEach(() => {
    cleanup();
  });

  test("UnderlineInputField가 placeholder를 렌더링하는지 테스트", () => {
    // Given: placeholder가 주어졌을 때
    const placeholder = "이름";

    // When: InputField 컴포넌트를 렌더링하면
    render(
      <TestWrapper>
        <UnderlineInputField placeholder={placeholder} errorMsg={undefined} />
      </TestWrapper>,
    );

    // Then: placeholder가 화면에 표시돼야 한다.
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  test("UnderlineInputField에 값이 입력되면 값이 화면에 표시되는지 테스트", () => {
    // Given: 컴포넌트를 렌더링했을 때
    render(
      <TestWrapper>
        <UnderlineInputField errorMsg={undefined} data-testid="underline-input-field" />
      </TestWrapper>,
    );
    const value = "테스트";
    const input = screen.getByTestId("underline-input-field");

    // When: 값을 입력하면
    fireEvent.change(input, { target: { value } });

    // Then: 값이 화면에 표시돼야 한다.
    expect(input).toHaveValue(value);
  });

  test("UnderlineInputField에 에러 메시지가 화면에 표시되는지 테스트", () => {
    // Given: 에러 메시지가 주어졌을 때
    const errorMsg = "이메일 형식이 올바르지 않습니다.";

    // When: InputField 컴포넌트를 렌더링하면
    render(
      <TestWrapper>
        <UnderlineInputField errorMsg={errorMsg} />
      </TestWrapper>,
    );

    // Then: 에러 메시지가 화면에 표시돼야 한다.
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });
});

describe("UnderlineInputField 스타일 테스트", () => {
  afterEach(() => {
    cleanup();
  });

  test("UnderlineInputField 요소가 올바른 typography 스타일을 가져야 한다", () => {
    // Given: 초기 상태일 때
    const placeholder = "이메일";

    // When: InputField 컴포넌트를 렌더링하면
    render(
      <TestWrapper>
        <UnderlineInputField placeholder={placeholder} errorMsg={undefined} />
      </TestWrapper>,
    );

    // Then: subtitle1Regular typography 스타일이 적용되어야 한다
    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toHaveStyle({
      font: theme.typography.subtitle1Regular,
    });
  });
});
