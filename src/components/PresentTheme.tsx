import styled from '@emotion/styled';
import LoadingSpinner from './common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getThemeList } from '@/Api/product';

const Container = styled.section`
  padding: 8px;
`;

const TitleContainer = styled.div`
  padding: 0px 8px 20px;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.6875rem;
  color: ${(props) => props.theme.colorScale.gray900};
  margin: 0px;
  width: 100%;
  text-align: left;
`;

const CategoryContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px 4px;
`;

const Category = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  cursor: pointer;
`;

const PresentImage = styled.img`
  max-width: 3.125rem;
  max-height: 3.125rem;
  width: 100%;
  border-radius: 18px;
  object-fit: cover;
  overflow: hidden;
`;

const PresentName = styled.p`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;
  color: ${(props) => props.theme.colorScale.gray900};
  margin: 0px;
  text-align: left;
`;

const LoadingContainer = styled(CategoryContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 250px;
`;

const PresentTheme = () => {
  const navigate = useNavigate();

  const {
    data: themeList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['themeList'],
    queryFn: getThemeList,
  });

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  if (isError || !themeList) return null;

  return (
    <Container>
      <TitleContainer>
        <Title>선물 테마</Title>
      </TitleContainer>
      <CategoryContainer>
        {themeList.map((theme) => (
          <Category key={theme.themeId} onClick={() => navigate(`/theme/${theme.themeId}`)}>
            <PresentImage src={theme.image} alt={theme.name} />
            <PresentName>{theme.name}</PresentName>
          </Category>
        ))}
      </CategoryContainer>
    </Container>
  );
};

export default PresentTheme;
