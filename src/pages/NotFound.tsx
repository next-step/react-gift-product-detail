
import { css } from '@emotion/react'

const notFoundStyle = css({
  textAlign: 'center',
  marginTop: 100,
  fontSize: 24,
  fontWeight: 700,
})

function NotFound() {
  return (
    <div css={notFoundStyle}>
      404 Not Found<br />
      존재하지 않는 페이지입니다.
    </div>
  )
}

export default NotFound