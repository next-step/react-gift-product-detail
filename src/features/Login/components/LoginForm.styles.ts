import styled from '@emotion/styled'
import { theme } from '@/theme'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${theme.colors.semanticColor.backgroundColor.default};
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  padding: ${theme.spacing[6]};
  margin-bottom: 100px;
  background-color: ${theme.colors.semanticColor.backgroundColor.default};
`

export const KakaoTitle = styled.div`
  width: 100px;
  height: 100px;
  margin: ${theme.spacing[4]};
`
