import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

import { useThemes } from '@/hooks/useThemes';
import { Grid, Item, ImageStyle } from '@/components/category/GiftCategoryGrid';
import { Wrapper, Title } from '@/components/category/GiftCategory.style';

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GiftCategoryList = () => {
  const navigate = useNavigate();
  const { data: themes, isLoading, isError } = useThemes();

  if (isLoading) {
    return (
      <LoadingWrapper>
        <FadeLoader color="#033128" height={15} width={5} />
      </LoadingWrapper>
    );
  }

  if (isError || !themes || themes.length === 0) return null;

  return (
    <Wrapper>
      <Title>선물 테마</Title>
      <Grid>
        {themes.map((item) => (
          <Item
            key={item.themeId}
            onClick={() => navigate(`/theme/${item.themeId}`)}
            style={{ cursor: 'pointer' }}
          >
            <ImageStyle src={item.image} alt={item.name} />
            <span>{item.name}</span>
          </Item>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default GiftCategoryList;
