import styled from '@emotion/styled';
import { ROUTE_PATH } from '@/routes/Routes';
import { getThemeInfo, getThemeList } from '@/Api/api';
import type { TypographyType } from '@/theme/tokens';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/queries/queryKeys';

const Wrapper = styled.section`
  width: 100%;
  padding: 1.625rem 1rem 1.375rem;
  background-color: rgb(75, 77, 80);
`;
const Margin = styled.div<{ height: string }>(({ height }) => ({
  width: '100%',
  height: height,
}));
const Text = styled.p<{ variant: keyof TypographyType }>(({ theme, variant }) => {
  const { size, weight, lineHeight } = theme.typography[variant];
  return {
    fontSize: size,
    fontWeight: weight,
    lineHeight,
    color: theme.colorScale.gray100,
    margin: 0,
    textAlign: 'left',
  };
});
const Title = styled.h5<{ variant: keyof TypographyType }>(({ theme, variant }) => {
  const { size, weight, lineHeight } = theme.typography[variant];
  return {
    fontSize: size,
    fontWeight: weight,
    lineHeight,
    color: theme.colorScale.gray00,
    margin: 0,
    textAlign: 'left',
  };
});

interface Props {
  themeId?: number;
}

const HeroSection: React.FC<Props> = ({ themeId }) => {
  const navigate = useNavigate();

  const {
    data: themeList,
    isLoading: listLoading,
    isError: listError,
  } = useQuery({
    queryKey: queryKeys.themeList(),
    queryFn: getThemeList,
    enabled: themeId === undefined,
    staleTime: 5 * 60 * 1000,
  });

  const resolvedId = themeId ?? themeList?.[0]?.themeId;

  const {
    data: theme,
    isLoading: infoLoading,
    isError: infoError,
  } = useQuery({
    queryKey: queryKeys.themeInfo(resolvedId as number),
    queryFn: () => getThemeInfo(resolvedId as number),
    enabled: resolvedId !== undefined,
    staleTime: 5 * 60 * 1000,
  });

  if (listError || infoError) {
    navigate(ROUTE_PATH.HOME, { replace: true });
    return null;
  }

  if (listLoading || infoLoading || !theme) return null;

  return (
    <Wrapper style={{ backgroundColor: theme.backgroundColor }}>
      <Text variant="subtitle2Bold">{theme.name}</Text>
      <Margin height="8px" />
      <Title variant="title1Bold">{theme.title}</Title>
      <Margin height="4px" />
      <Text variant="body1Regular">{theme.description}</Text>
    </Wrapper>
  );
};

export default HeroSection;
