import styled from "@emotion/styled"
import theme from "@/styles/theme"

interface RowProps {
  padding?: keyof (typeof theme)["space"]
}

const Row = styled.div<RowProps>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: ${({ padding = "spacing2", theme }) => theme.space[padding]};
`
export default Row
