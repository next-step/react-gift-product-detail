import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { fetchThemes } from '@/api/themesApi';
import type { giftCategoryTheme } from '@/types/giftCategoryTheme';

import { FadeLoader } from 'react-spinners';
import { Grid, Item, ImageStyle } from '@/components/category/GiftCategoryGrid';
import { Wrapper, Title } from '@/components/category/GiftCategory.style';
import { useNavigate } from 'react-router-dom';

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GiftCategoryList = () => {
  const navigate = useNavigate();

  const {
    data: themes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['themes'], 
    queryFn: fetchThemes, 
    select: (res) => res.data.data, 
  });

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
        {themes.map((item:giftCategoryTheme) => (
          <Item
            key={item.themeId}
            onClick={() => {
              navigate(`/theme/${item.themeId}`);
            }}
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
