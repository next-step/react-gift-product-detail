/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { useState, Suspense } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { MdFace2, MdFace, MdFace6 } from 'react-icons/md';

import {
  sectionWrapper,
  tabRow,
  subTabRow,
  cardGrid,
  moreButton,
  emptyStateStyle,
} from './RankingSection.style';

import TabButton from '../Shared/TabButton';
import RankingCard from '../Shared/RankingCard';
import { UserManagement } from '../../../Login/contexts/UserManagement';

import { useSuspenseRanking } from '../../../../apis/ranking';
import { ErrorBoundary } from '../../../../ErrorBoundary';

const genderTabs = [
  { label: '전체', icon: <FaUser /> },
  { label: '여성이', icon: <MdFace2 /> },
  { label: '남성이', icon: <MdFace /> },
  { label: '청소년이', icon: <MdFace6 /> },
];

const giftTabs = ['받고 싶어한', '많이 선물한', '위시로 받은'];

const RankingContent = ({
  gender,
  giftType,
  isExpanded,
  toggleExpanded,
  handleCardClick,
}: {
  gender: string;
  giftType: string;
  isExpanded: boolean;
  toggleExpanded: () => void;
  handleCardClick: (id: number) => void;
}) => {
  const theme = useTheme();
  const { data: items } = useSuspenseRanking(gender, giftType);
  const visibleItems = isExpanded ? items : items.slice(0, 6);

  if (items.length === 0) {
    return <div css={emptyStateStyle}>상품 목록이 없습니다.</div>;
  }

  return (
    <>
      <div css={cardGrid}>
        {visibleItems.map((item, i) => (
          <div key={item.id} onClick={() => handleCardClick(item.id)}>
            <RankingCard
              rank={i + 1}
              imageUrl={item.imageURL}
              name={item.name}
              brand={item.brandInfo.name}
              price={item.price.sellingPrice}
              onClick={() => handleCardClick(item.id)}
            />
          </div>
        ))}
      </div>
      {items.length > 6 && (
        <button onClick={toggleExpanded} css={moreButton(theme)}>
          {isExpanded ? '접기' : '더보기'}
        </button>
      )}
    </>
  );
};

const RankingSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = UserManagement();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialGender = searchParams.get('gender') || '전체';
  const initialGiftType = searchParams.get('giftType') || '받고 싶어한';

  const [gender, setGender] = useState(initialGender);
  const [giftType, setGiftType] = useState(initialGiftType);
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilters = (newGender: string, newGiftType: string) => {
    setSearchParams({ gender: newGender, giftType: newGiftType });
    setGender(newGender);
    setGiftType(newGiftType);
    setIsExpanded(false);
  };

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  const handleCardClick = (itemId: number) => {
    if (user) {
      navigate({ pathname: `/detail/${itemId}` });
    } else {
      navigate({
        pathname: `/login`,
        search: `?redirect=/detail/${itemId}`,
      });
    }
  };

  return (
    <section css={sectionWrapper}>
      <h2
        css={css`
          margin-bottom: ${theme.spacing[3]};
        `}
      >
        실시간 급상승 선물랭킹
      </h2>

      <div css={tabRow}>
        {genderTabs.map(({ label, icon }) => (
          <TabButton
            key={label}
            active={gender === label}
            theme={theme}
            onClick={() => updateFilters(label, giftType)}
            icon={icon}
            label={label}
          />
        ))}
      </div>

      <div css={subTabRow}>
        {giftTabs.map((label) => (
          <TabButton
            key={label}
            active={giftType === label}
            theme={theme}
            onClick={() => updateFilters(gender, label)}
            label={label}
            isSubTab
          />
        ))}
      </div>

      <ErrorBoundary
        fallback={
          <div css={emptyStateStyle}>에러가 발생했어요. 다시 시도해주세요.</div>
        }
      >
        <Suspense fallback={<div>로딩 중...</div>}>
          <RankingContent
            gender={gender}
            giftType={giftType}
            isExpanded={isExpanded}
            toggleExpanded={toggleExpanded}
            handleCardClick={handleCardClick}
          />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
};

export default RankingSection;
