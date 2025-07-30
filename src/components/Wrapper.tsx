import styled from "@emotion/styled"
import theme from "@/styles/theme"

const Wrapper = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background: ${theme.colors.gray00};
  padding: ${theme.space.spacing2};
  cursor: pointer;
  width: 64px;
`
export default Wrapper
