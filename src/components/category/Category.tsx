import { css } from '@emotion/react';
import {
  CategoryWrapper,
  CategoryHeader,
  CategoryTitle,
  CategoryGrid,
  CategoryItem,
  CategoryImage,
} from './Category.styles';
import type { CategoryType } from '@/types/category';
import { fetchCategories } from '@/services/themeApi';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/Router';
import { useQuery } from '@tanstack/react-query';

const Category = () => {
  const navigate = useNavigate();
  const {
    data: category = [],
    isLoading,
    error,
  } = useQuery<CategoryType[]>({
    queryKey: ['category'],
    queryFn: fetchCategories,
  });
  const handleClickCategory = (themeId: number) => {
    navigate(ROUTE_PATH.THEME.replace(':themeId', String(themeId)));
  };

  if (isLoading) return <div>📢 카테고리가 로딩중입니다..</div>;
  if (error) return <div>❌ 오류 발생: {String(error)}</div>;
  if (category?.length === 0) return <div>📭 선물 테마가 없습니다.</div>;

  return (
    <CategoryWrapper>
      <CategoryHeader>
        <CategoryTitle>선물 테마</CategoryTitle>
      </CategoryHeader>
      <CategoryGrid>
        {category.map((item) => (
          <CategoryItem onClick={() => handleClickCategory(item.themeId)} key={item.themeId}>
            <CategoryImage src={item.image} alt={item.name} />
            <p
              css={css`
                font-size: 0.75rem;
                font-weight: 400;
                line-height: 1rem;
              `}
            >
              {item.name}
            </p>
          </CategoryItem>
        ))}
      </CategoryGrid>
    </CategoryWrapper>
  );
};

export default Category;
