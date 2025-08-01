import { useNavigate } from "react-router-dom";
import type { Themetype } from "@/types/DTO/themeDTO";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { useThemes } from "@/hooks/useThemes";
import {
  Container,
  Title,
  Grid,
  CategoryItem,
  CategoryImage,
  Text,
} from "@/pages/Home/components/CategorySection/CategorySection.style";

const CategorySection = () => {
  const { data: themes = [], isLoading, error } = useThemes();
  const navigate = useNavigate();

  const handleThemeClick = (themeId: number) => {
    navigate(`/theme/${themeId}`);
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingSpinner size={40} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Text>테마 목록을 불러오는데 실패했습니다.</Text>
      </Container>
    );
  }

  if (themes.length === 0) {
    return (
      <Container>
        <Text>표시할 테마가 없습니다.</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Title>선물 테마</Title>
      <Grid>
        {themes.map((theme: Themetype) => (
          <CategoryItem
            key={theme.themeId}
            onClick={() => handleThemeClick(theme.themeId)}
          >
            <CategoryImage src={theme.image} alt={theme.name} />
            <Text>{theme.name}</Text>
          </CategoryItem>
        ))}
      </Grid>
    </Container>
  );
};

export default CategorySection;
