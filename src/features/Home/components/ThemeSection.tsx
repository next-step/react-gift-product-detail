import EmptyMessage from '@components/common/EmptyMessage';
import SuspenseErrorBoundaryWrapper from '@components/common/SuspenseErrorBoundaryWrapper ';
import styled from '@emotion/styled';
import { themeOptions } from '@queries/theme';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
export interface GiftTheme {
  themeId: number;
  name: string;
  image: string;
}

const ThemeSection = () => {
  return (
    <Section>
      <SectionTitle>선물 테마</SectionTitle>
      <SuspenseErrorBoundaryWrapper>
        <ThemeGrid />
      </SuspenseErrorBoundaryWrapper>
    </Section>
  );
};

const ThemeGrid = () => {
  const { data: themes } = useSuspenseQuery(themeOptions());

  if (themes.length === 0) {
    return <EmptyMessage>선물 테마가 없습니다.</EmptyMessage>;
  }

  return (
    <Grid>
      {themes.map((theme: GiftTheme) => (
        <Theme key={theme.themeId} theme={theme} />
      ))}
    </Grid>
  );
};

interface ThemeProps {
  theme: GiftTheme;
}

const Theme = ({ theme }: ThemeProps) => {
  const navigate = useNavigate();
  return (
    <Item onClick={() => navigate(`/theme/${theme.themeId}`)}>
      <Image src={theme.image} alt={theme.name} />
      <Label>{theme.name}</Label>
    </Item>
  );
};

export default ThemeSection;

const Section = styled.section`
  height: 16.6875rem;
  padding: ${({ theme }) => theme.spacing.spacing4};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing3};
`;

const Item = styled.div`
  text-align: center;
`;

const Image = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 12px;
`;

const Label = styled.p`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray800};
`;
const SectionTitle = styled.div(({ theme }) => ({
  ...theme.typography.label1Bold,
  marginBottom: theme.spacing.spacing3,
}));
