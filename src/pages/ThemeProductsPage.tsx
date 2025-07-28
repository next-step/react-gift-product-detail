import { css } from '@emotion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';
import GlobalStyle from '@/styles/GlobalStyle';
import Header from '@/components/Header';
import { useThemeInfoQuery } from '@/hooks/useCategoryQuery';
import ThemeProductGrid from '@/components/ThemeProductGrid';
import { spinnerStyle } from '@/styles/common';

const heroStyle = (backgroundColor: string) => css({
  background: backgroundColor,
  padding: `${spacing.spacing8} ${spacing.spacing4}`,
  minHeight: '80px',
  display: 'flex',
  flexDirection: 'column',
});

const heroTitleStyle = css({
  ...typography.title1Bold,
  color: 'white',
  marginBottom: spacing.spacing1,
});

const heroDescriptionStyle = css({
  ...typography.body1Regular,
  color: colors.textSub,
  maxWidth: '600px',
});

const loadingStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  color: colors.textSub,
  flexDirection: 'column',
  gap: spacing.spacing2,
});


// ...existing code...

const ThemeProductsPage = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  // 쿼리 훅 사용
  const { data: themeInfo, isLoading: loading, error } = useThemeInfoQuery(Number(themeId));

  // ...existing code...

  if (loading) {
    return (
      <div>
        <GlobalStyle />
        <Header />
        <div css={loadingStyle}>
          <div css={spinnerStyle}></div>
          <div>테마 정보를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (error || !themeInfo) {
    return (
      <div>
        <GlobalStyle />
        <Header />
        <div css={loadingStyle}>
          <div>테마를 찾을 수 없습니다.</div>
          <button 
            onClick={() => navigate('/')}
            style={{
              padding: '8px 16px',
              background: colors.kakaoYellow,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '16px'
            }}
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <GlobalStyle />
      <Header />
      {/* 히어로 영역 */}
      <section css={heroStyle(themeInfo.backgroundColor)}>
        <h2 css={heroTitleStyle}>{themeInfo.name}</h2>
        <h1 css={heroTitleStyle}>{themeInfo.title}</h1>
        <p css={heroDescriptionStyle}>{themeInfo.description}</p>
      </section>
      {/* 상품 목록 영역 */}
      <ThemeProductGrid themeId={Number(themeId)} />
    </div>
  );
};

export default ThemeProductsPage;