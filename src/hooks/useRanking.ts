import { useState } from 'react';
import { SEX_TYPE } from '@/types/sex';
import type { SexType } from '@/types/sex';
import type { CategoryType } from '@/types/category';
import { CATEGORY_TYPE } from '@/types/category';
import { getRanking } from '@/apis/product';
import type { RankItemType } from '@/types/DTO/productDTO';
import { useQuery } from '@tanstack/react-query';

function useRanking() {

  function getInitialSex(): SexType {
    const saved = localStorage.getItem('selectedSex');
    if (saved && Object.values(SEX_TYPE).some((sex) => sex.value === saved))
      return saved as SexType;
    return SEX_TYPE[0].value;
  }
  const [selectedSex, setSelectedSex] = useState<SexType>(getInitialSex);
  function handleSelect(sex: SexType) {
    setSelectedSex(sex || 'ALL');
    localStorage.setItem('selectedSex', sex);
  }

  function getInitialCategory(): CategoryType {
    const category = localStorage.getItem('selectedCategory');
    if (category && Object.values(CATEGORY_TYPE).some((cat) => cat.value === category))
      return category as CategoryType;
    return CATEGORY_TYPE[0].value;
  }
  const [selectCategory, setSelectCategory] = useState<CategoryType>(getInitialCategory);

  function handleCategoryClick(category: CategoryType) {
    setSelectCategory(category);
    localStorage.setItem('selectedCategory', category);
  }
  const { data, isLoading, error } = useQuery<RankItemType[]>({
    queryKey: ['ranking', selectedSex, selectCategory],
    queryFn: () =>
      getRanking({
        targetType: selectedSex,
        rankType: selectCategory,
      }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return {
    isLoading,
    error,
    selectedSex,
    selectCategory,
    items: data || [],
    setSelectedSex,
    setSelectCategory,
    handleSelect,
    handleCategoryClick,
  };
}

export default useRanking;
