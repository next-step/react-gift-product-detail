import styled from '@emotion/styled';

import { SelectThemeSectionListItem } from './ListItem';
import { Typography } from '@/components/common/Typography';
import { Link } from 'react-router';
import { getPath } from '@/pages/Routes';
import { useReadThemes } from '@/apis/hooks/useReadThemes';
import { Suspense } from 'react';
import { SelectThemeSectionLoader } from './Loader';

export const SelectThemeSection = () => {
  return (
    <Section>
      <TitleWrapper>
        <Typography as='h3' variant='title1Bold' color='default' width='100%'>
          선물 테마
        </Typography>
      </TitleWrapper>
      <Suspense fallback={<SelectThemeSectionLoader />}>
        <List />
      </Suspense>
    </Section>
  );
};

const List = () => {
  const { data: themes } = useReadThemes();

  return (
    <Wrapper>
      {themes.map((theme) => (
        <Link to={getPath.themes(theme.themeId)} key={theme.themeId}>
          <SelectThemeSectionListItem key={theme.themeId} label={theme.name} image={theme.image} />
        </Link>
      ))}
    </Wrapper>
  );
};

const Section = styled.section(({ theme }) => ({
  padding: `0${theme.spacing.spacing2}`,
}));

const TitleWrapper = styled.div(({ theme }) => ({
  padding: `0 ${theme.spacing.spacing2} ${theme.spacing.spacing5}`,
}));

const Wrapper = styled.div(({ theme }) => ({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: `${theme.spacing.spacing5} ${theme.spacing.spacing1}`,
}));
