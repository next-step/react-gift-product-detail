import { useState } from 'react';

export const useSelectedFilter = () => {
  const [targetType, setTargetType] = useState(localStorage.getItem('currentTarget') || 'ALL');
  const [rankType, setRankType] = useState(localStorage.getItem('currentTopic') || 'MANY_WISH');

  return { targetType, setTargetType, rankType, setRankType };
};
