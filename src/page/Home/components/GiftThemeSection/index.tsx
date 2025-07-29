import styled from '@emotion/styled';
import ThemeList from './ThemeList';

const GiftThemeSection = () => {
  return (
    <section>
      <TitleContainer>
        <Title>선물 테마</Title>
      </TitleContainer>
      <ThemeList />
    </section>
  );
};

export default GiftThemeSection;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  margin: 0px;
  width: 100%;
  text-align: left;
`;

const TitleContainer = styled.div`
  padding: 20px 20px;
`;
