import { StyledThemesProductLabelItem } from './StyledThemesProductItem';
import { usePresentThemeFetch } from './useThemesProductLabel';

export const ThemesProductionLabel = () => {
  const { label, labelError, isLabelLoading } = usePresentThemeFetch();

  if (isLabelLoading) {
    return <div>로딩 중</div>;
  } else if (labelError) {
    console.log(labelError);
    return <div>에러 발생</div>;
  } else if (!label) {
    return <div>데이터 없음</div>;
  } else {
    return (
      <StyledThemesProductLabelItem background={label?.backgroundColor}>
        <p className='label1Reuglar color-white'>{label?.name}</p>
        <p className='title2Bold color-white'>{label?.title}</p>
        <p className='title2Regular color-white'>{label?.description}</p>
      </StyledThemesProductLabelItem>
    );
  }
};
