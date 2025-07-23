import styled from "@emotion/styled";
import { type ThemeInfo } from "@/api/theme";

type Props = {
  info: ThemeInfo;
};

export const ThemeHero = ({ info }: Props) => {
  return (
    <HeroWrapper style={{ backgroundColor: info.backgroundColor }}>
      <Name>{info.name}</Name>
      <Title>{info.title}</Title>
      <Description>{info.description}</Description>
    </HeroWrapper>
  );
};

const HeroWrapper = styled.section`
  ${({ theme }) => `
    padding: ${theme.spacing.spacing8} ${theme.spacing.spacing5} ${theme.spacing.spacing6};
    color: ${theme.colors.colorScale.gray.gray00}; 
  `}
`;

const Name = styled.p`
  ${({ theme }) => `
    font-size: ${theme.typography.body2Bold.fontSize};
    font-weight: ${theme.typography.body2Bold.fontWeight};
    line-height: ${theme.typography.body2Bold.lineHeight};
    margin-bottom: ${theme.spacing.spacing1}; 
  `}
`;

const Title = styled.h1`
  ${({ theme }) => `
    font-size: ${theme.typography.title1Bold.fontSize};
    font-weight: ${theme.typography.title1Bold.fontWeight};
    line-height: ${theme.typography.title1Bold.lineHeight};
    margin-bottom: ${theme.spacing.spacing3}; 
  `}
`;

const Description = styled.p`
  ${({ theme }) => `
    font-size: ${theme.typography.body2Regular.fontSize};
    font-weight: ${theme.typography.body2Regular.fontWeight};
    line-height: ${theme.typography.body2Regular.lineHeight};
  `}
`;
