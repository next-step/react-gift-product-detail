import { render, screen, cleanup } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import theme from "@/styles/theme/theme";
import ErrorMessage from "@/components/error/ErrorMessage";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("ErrorMessage 기능 테스트", () => {
  afterEach(() => {
    cleanup();
  });

  test("ErrorMessage가 렌더링되는지 테스트", () => {
    // Given: placeholder가 주어졌을 때
    const message = "에러 메시지";

    // When: InputField 컴포넌트를 렌더링하면
    render(
      <TestWrapper>
        <ErrorMessage>{message}</ErrorMessage>
      </TestWrapper>,
    );

    // Then: placeholder가 화면에 표시돼야 한다.
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});

describe("ErrorMessage 스타일 테스트", () => {
  afterEach(() => {
    cleanup();
  });

  test("ErrorMessage 요소가 올바른 typography 스타일을 가져야 한다", () => {
    // Given: 초기 상태일 때
    const message = "에러 메시지";

    // When: InputField 컴포넌트를 렌더링하면
    render(
      <TestWrapper>
        <ErrorMessage>{message}</ErrorMessage>
      </TestWrapper>,
    );

    // Then: body1Regular typography 스타일이 적용되어야 한다
    const errorMessage = screen.getByText(message);
    expect(errorMessage).toHaveStyle({
      font: theme.typography.label2Regular,
    });
  });

  test("에러 메시지가 올바른 색상을 가져야 한다", () => {
    // Given: 에러 메시지가 있는 InputField가 렌더링되었을 때
    const errorMsg = "에러 메시지";

    // When: InputField 컴포넌트를 렌더링하면
    render(
      <TestWrapper>
        <ErrorMessage>{errorMsg}</ErrorMessage>
      </TestWrapper>,
    );

    // Then: critical 색상이 적용되어야 한다
    const errorElement = screen.getByText(errorMsg);
    expect(errorElement).toHaveStyle({
      color: theme.color.stateColor.critical,
    });
  });
});
