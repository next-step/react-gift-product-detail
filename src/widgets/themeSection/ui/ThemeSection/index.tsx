import CheerUpMessage from '../CheerUpMessage';
import { ThemeField } from '@/features/themeCatalog';
import * as S from './styles';

const ThemeSection = () => {
  return (
    <S.Section>
      <ThemeField />
      <CheerUpMessage />   
    </S.Section>
  );
};

export default ThemeSection; 