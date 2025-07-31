import { theme } from '@/theme/theme';
import NavigationBar from '@components/NavigationBar';
import styled from '@emotion/styled';
import BodySection from './components';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
  background-color: ${theme.semanticColors.background.fill};
`;

const Main = styled.div`
  max-width: 720px;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: ${theme.semanticColors.background.default};
  padding-top: 2.75rem;
`;
const ProductDetail = () => {
  return (
    <>
      <Wrapper>
        <NavigationBar />
        <Main>
          <BodySection />
        </Main>
      </Wrapper>
    </>
  );
};

export default ProductDetail;
