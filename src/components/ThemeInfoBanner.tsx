import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import type { CSSProperties } from 'react';
import { useThemeInfoQuery } from '@/hooks/queries/useThemeInfoQuery';

export const ThemeInfoBanner = () => {
  const { themeId } = useParams<{ themeId: string }>();
  useNavigate();
  const { isPending, data } = useThemeInfoQuery(Number(themeId));

  if (isPending || !data) return <div style={{ height: '128px' }} />;

  return (
    <Container backgroundColor={data.backgroundColor}>
      <ThemeName>{data.name}</ThemeName>
      <ThemeTitle>{data.title}</ThemeTitle>
      <ThemeDescription>{data.description}</ThemeDescription>
    </Container>
  );
};

const Container = styled.section<{ backgroundColor?: CSSProperties['backgroundColor'] }>`
    width: 100%;
    height: 128px;

    padding: 26px 16px 22px 16px;

    background-color: ${({ backgroundColor }) => backgroundColor};
    color: #fff;
`;

const ThemeName = styled.p`
    font-size: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
    font-weight: ${({ theme }) => theme.typography.label.label1Bold.fontWeight};
`;

const ThemeTitle = styled.h1`
    font-size: ${({ theme }) => theme.typography.title.title1Bold.fontSize};
    font-weight: ${({ theme }) => theme.typography.title.title1Bold.fontWeight};
`;

const ThemeDescription = styled.p`
    font-size: ${({ theme }) => theme.typography.body.body1Regular.fontSize};
    font-weight: ${({ theme }) => theme.typography.body.body1Regular.fontWeight};

    margin-top: 8px;
`;
