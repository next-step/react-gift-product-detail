import { Section, Title, Grid, Item, Image, Label } from './styles';
import { type Theme, useGetThemes } from './useGetThemes';
import { Link } from 'react-router-dom';
import { PATH } from '@/constants/paths';
import { ApiErrorBoundary } from '@/components/common/ErrorBoundary';
import { SuspenseWrapper } from '@/components/common/SuspenseWrapper';

const GiftThemeSection = () => (
  <ApiErrorBoundary>
    <SuspenseWrapper>
      <GiftThemeContent />
    </SuspenseWrapper>
  </ApiErrorBoundary>
);

function GiftThemeContent() {
  const { themes } = useGetThemes();
  if (!themes || themes.length === 0) return null;
  return (
    <Section>
      <Title>선물 테마</Title>
      <Grid>
        {themes.map((theme: Theme) => (
          <Link
            to={PATH.THEME_PRODUCTS.replace(':themeId', String(theme.themeId))}
            key={theme.themeId}
          >
            <Item type="button">
              <Image src={theme.image} alt={theme.name} />
              <Label>{theme.name}</Label>
            </Item>
          </Link>
        ))}
      </Grid>
    </Section>
  );
}

export default GiftThemeSection;
