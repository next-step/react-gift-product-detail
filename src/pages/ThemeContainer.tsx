import ThemeItem from '@/components/ThemeItem';
import type { Themetype } from '@/types/DTO/themeDTO';
import { ThemeContainerWrapper, ThemeTitle, Message } from '@/styles/Theme/ThemeContainer.styles';
import { getThemes } from '@/apis/theme';

import { useQuery } from '@tanstack/react-query';

function ThemeContainer() {
  const {
    data: themes = [],
    isLoading,
    error,
  } = useQuery<Themetype[]>({
    queryKey: ['themes'],
    queryFn: getThemes,
  });

  if (isLoading) return <>테마를 부르는 중입니다.</>;
  if (error) return <p>{error.message}</p>;

  return (
    <ThemeContainerWrapper>
      <ThemeTitle>선물 테마</ThemeTitle>
      {themes.map((theme) => (
        <ThemeItem key={theme.themeId} theme={theme} />
      ))}
      <Message>응원 메시지!~!</Message>
    </ThemeContainerWrapper>
  );
}

export default ThemeContainer;
