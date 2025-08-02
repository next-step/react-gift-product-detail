import { css } from '@emotion/react';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import { typography } from '../styles/typography';
import { useCategoriesQuery } from '../hooks/useCategoryQuery';
import { useNavigate } from 'react-router-dom';

const sectionStyle = css({
  background: colors.backgroundDefault,
  borderRadius: 16,
  padding: parseInt(spacing.spacing6),
  marginBottom: parseInt(spacing.spacing5),
});

const listStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: parseInt(spacing.spacing8),
});

const itemStyle = css({
  textAlign: 'center',
  width: 80,
  cursor: 'pointer', // 클릭 가능하게 커서 변경
});

const imgStyle = css({
  borderRadius: 12,
});

const nameStyle = css({
  marginTop: parseInt(spacing.spacing2),
  ...typography.body2Regular,
  color: colors.textDefault,
});


const CategoryList = () => {
  const { data: categoryData } = useCategoriesQuery();
  const navigate = useNavigate();

  return (
    <section css={sectionStyle}>
      <div css={listStyle}>
        {(categoryData ?? []).map((item) => (
          <div
            key={item.themeId}
            css={itemStyle}
            onClick={() => navigate(`/theme/${item.themeId}`)}
          >
            <img
              src={item.image}
              alt={item.name}
              width={56}
              height={56}
              css={imgStyle}
            />
            <div css={nameStyle}>{item.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
