import { colors } from "./Color";
import { typography } from "./Typography";
import { spacing } from "./Spacing";

export const theme = {
  colors,
  typography,
  spacing,
};

export type AppTheme = typeof theme;

// emotion Theme 타입 확장
import "@emotion/react";
declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends AppTheme {
    // emotion theme 확장을 위한 빈 인터페이스
    // 이는 emotion 라이브러리의 타입 시스템과 호환성을 위한 필수 구조
  }
}
