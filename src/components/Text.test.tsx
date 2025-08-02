import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "@emotion/react"
import { describe, it, expect } from "vitest"
import theme from "@/styles/theme"
import Text from "@/components/Text"

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

describe("Text 컴포넌트", () => {
  it("모든 스타일 prop이 theme 값과 함께 올바르게 적용된다", () => {
    renderWithTheme(
      <Text
        variant="label2Regular"
        padding="spacing0"
        marginTop="spacing2"
        marginRight="spacing1"
        marginLeft="spacing4"
        marginBottom="spacing3"
        color="gray700"
      >
        Hello,World!
      </Text>
    )

    const testText = screen.getByText(/hello/i)

    const [fontSize, fontWeight, lineHeight] =
      theme.Typography.label2Regular.split(/\s+/)

    expect(testText).toHaveStyle({
      fontSize,
      fontWeight,
      lineHeight,
    })

    expect(testText).toHaveStyle({
      padding: theme.space.spacing0,
      marginTop: theme.space.spacing2,
      marginRight: theme.space.spacing1,
      marginLeft: theme.space.spacing4,
      marginBottom: theme.space.spacing3,
    })

    expect(testText).toHaveStyle({ color: theme.colors.gray700 })
  })
})
