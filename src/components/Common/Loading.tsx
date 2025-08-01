import { spinnerStyle, loadingContainerStyle } from '@/styles/common';

function Loading() {
  return (
    <div
      css={loadingContainerStyle}
      style={{
        width: '100%',
        height: '100%',
        minHeight: 400, // 최소 높이
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div css={spinnerStyle}></div>
      <span style={{ color: '#3498db', fontWeight: 600, fontSize: 18, marginTop: 16 }}>
        로딩 중입니다...
      </span>
    </div>
  );
}

export default Loading;
