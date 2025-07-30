import styled from "@emotion/styled"
import type { ComponentStyle } from "@/interfaces/ComponentStyle"

const Blank = styled.div<ComponentStyle>`
  width: 100%;
  max-width: 720px;
  height: ${(props) => props.height};
  background-color: ${(props) => props.backGroundColor};
`
export default Blank
