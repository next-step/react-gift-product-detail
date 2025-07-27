import React from 'react';
import type { ProductDetail } from '../../types';
import * as S from './styles';

interface DescriptionTabProps {
  detail: ProductDetail;
}

const DescriptionTab: React.FC<DescriptionTabProps> = ({ detail }) => {
  return (
    <S.DescriptionWrapper
      dangerouslySetInnerHTML={{ __html: detail.description }}
    />
  );
};

export default DescriptionTab;
