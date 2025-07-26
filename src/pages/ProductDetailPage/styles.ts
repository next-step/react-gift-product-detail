/** @jsxImportSource @emotion/react */
import { css, type Theme as ThemeType } from '@emotion/react';

export const containerStyle = (theme: ThemeType) => css`
  max-width: 768px;
  margin: 0 auto;
  padding: ${theme.spacing[6]};
  padding-bottom: 80px;
`;

export const loadingStyle = (theme: ThemeType) => css`
  padding: ${theme.spacing[10]};
  text-align: center;
  color: ${theme.color.semantic.textSub};
`;

export const errorStyle = (theme: ThemeType) => css`
  padding: ${theme.spacing[10]};
  text-align: center;
  color: ${theme.color.semantic.critical};
`;

export const reviewAuthorStyle = (theme: ThemeType) => css`
  ${theme.typography.label1Bold}
  color: ${theme.color.semantic.textDefault};
`;

export const productImage = (theme: ThemeType) => css`
  width: 100%;
  height: auto;
  max-height: none;
  object-fit: contain;
  border-radius: ${theme.spacing[3]};
`;

export const infoSection = (theme: ThemeType) => css`
  margin-top: ${theme.spacing[6]};
  margin-bottom: ${theme.spacing[8]};
`;

export const productName = (theme: ThemeType) => css`
  ${theme.typography.title1Bold}
  margin-bottom: ${theme.spacing[2]};
  color: ${theme.color.semantic.textDefault};
`;

export const brand = (theme: ThemeType) => css`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[1]};
`;

export const brandImage = (theme: ThemeType) => css`
  width: ${theme.spacing[6]};
  height: ${theme.spacing[6]};
  border-radius: 50%;
  object-fit: cover;
`;

export const brandName = (theme: ThemeType) => css`
  ${theme.typography.label1Regular}
  color: ${theme.color.semantic.textSub};
`;

export const price = (theme: ThemeType) => css`
  ${theme.typography.title2Bold}
  color: ${theme.color.semantic.textDefault};
  margin-bottom: ${theme.spacing[3]};
`;

export const tabContainer = (theme: ThemeType) => css`
  display: flex;
  justify-content: space-around;
  margin: ${theme.spacing[6]} 0 ${theme.spacing[4]};
  border-bottom: 1px solid ${theme.color.gray.gray700};
`;

export const tabButton = (theme: ThemeType) => css`
  flex: 1;
  padding: ${theme.spacing[3]} 0;
  ${theme.typography.body1Regular}
  background: none;
  border: none;
  cursor: pointer;
  color: ${theme.color.semantic.textSub};
  transition: color 0.2s;
`;

export const activeTabStyle = (theme: ThemeType) => css`
  color: ${theme.color.semantic.textDefault};
  font-weight: bold;
  border-bottom: 2px solid ${theme.color.semantic.textDefault};
`;

export const tabContent = (theme: ThemeType) => css`
  ${theme.typography.body2Regular}
  line-height: 1.6;
  padding-bottom: ${theme.spacing[6]};

  ul {
    padding-left: ${theme.spacing[5]};
    list-style: disc;

    li {
      margin-bottom: ${theme.spacing[2]};
    }
  }

  strong {
    font-weight: 600;
  }
`;

export const bottomActionSection = (theme: ThemeType) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${theme.spacing[6]};
  border-top: 1px solid ${theme.color.gray.gray600};
`;

export const wishButton = (theme: ThemeType) => css`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
  background: none;
  border: none;
  cursor: pointer;
  ${theme.typography.label2Regular}
`;

export const orderButton = (theme: ThemeType) => css`
  background: ${theme.color.semantic.kakaoYellow};
  color: #000;
  font-weight: bold;
  padding: ${theme.spacing[3]} ${theme.spacing[6]};
  border-radius: ${theme.spacing[2]};
  border: none;
  cursor: pointer;
  ${theme.typography.body1Bold}
`;
