import { useThemeInfoQuery } from '@/hooks/useCategoryQuery';

interface ThemeHeroSectionProps {
  themeId: number;
}

const ThemeHeroSection = ({ themeId }: ThemeHeroSectionProps) => {
  const { data: themeInfo } = useThemeInfoQuery(themeId);
  if (!themeInfo) return null;
  return (
    <section style={{ background: themeInfo.backgroundColor, padding: '32px 16px', minHeight: '80px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontWeight: 700, fontSize: 28, color: 'white', marginBottom: 8 }}>{themeInfo.name}</h2>
      <h1 style={{ fontWeight: 700, fontSize: 32, color: 'white', marginBottom: 8 }}>{themeInfo.title}</h1>
      <p style={{ color: '#b0b8c1', maxWidth: 600 }}>{themeInfo.description}</p>
    </section>
  );
};

export default ThemeHeroSection;
