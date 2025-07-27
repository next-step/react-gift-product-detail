import React from 'react';
import type { ProductDetail } from '../../types';
import * as S from './styles';

interface DetailTabProps {
  detail: ProductDetail;
}

const DetailTab: React.FC<DetailTabProps> = ({ detail }) => {
  return (
    <S.Details>
      {detail.announcements.map((announcement) => (
        <S.DetailWrapper key={announcement.name}>
          <S.DetailName>{announcement.name}</S.DetailName>
          <S.DetailValue>{announcement.value}</S.DetailValue>
        </S.DetailWrapper>
      ))}
    </S.Details>
  );
};

export default DetailTab;
