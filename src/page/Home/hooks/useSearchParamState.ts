import type { FilterId, GenerationId } from '@/data/categoryDatas';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useSearchParamState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeGeneration, setActiveGeneration] = useState<GenerationId>('ALL');
  const [activeFilter, setActiveFilter] = useState<FilterId>('MANY_WISH');

  useEffect(() => {
    const generation = searchParams.get('targetType') ?? 'ALL';
    const filter = searchParams.get('rankType') ?? 'MANY_WISH';

    setActiveGeneration(generation as GenerationId);
    setActiveFilter(filter as FilterId);
  }, [searchParams]);

  const selectGeneration = (id: GenerationId) => {
    setActiveGeneration(id);
    searchParams.set('targetType', id);
    setSearchParams(searchParams, { replace: true });
  };

  const selectFilter = (id: FilterId) => {
    setActiveFilter(id);
    searchParams.set('rankType', id);
    setSearchParams(searchParams, { replace: true });
  };

  return {
    selectGeneration,
    selectFilter,
    activeGeneration,
    activeFilter,
  };
};

export default useSearchParamState;
