import { spinnerStyle, loadingContainerStyle } from '@/styles/common';
import { css } from '@emotion/react';

const loadingInlineContainerStyle = css({
  width: '100%',
  height: '100%',
  minHeight: 400, // 최소 높이
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const loadingTextStyle = css({
  color: '#3498db',
  fontWeight: 600,
  fontSize: 18,
  marginTop: 16,
});

function Loading() {
  return (
    <div css={[loadingContainerStyle, loadingInlineContainerStyle]}>
      <div css={spinnerStyle}></div>
      <span css={loadingTextStyle}>
        로딩 중입니다...
      </span>
    </div>
  );
}

export default Loading;
