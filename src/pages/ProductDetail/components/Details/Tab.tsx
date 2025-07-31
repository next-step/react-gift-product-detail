import { theme } from '@/theme/theme';
import styled from '@emotion/styled/macro';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  border-bottom: 1px solid rgb(238, 239, 241);
`;

const Button = styled.button`
  position: relative;
  padding: 16px 20px;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 1;
  transition: 0.2s;
  width: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0%;
`;

const Title = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.375rem;
  color: ${theme.semanticColors.text.default};
  margin: 0px;
  text-align: left;
`;
const SelectedTab = styled.div`
  position: absolute;
  bottom: -1px;
  left: 0px;
  right: 0px;
  height: 2px;
  background-color: rgb(42, 48, 56);
`;

const Tab = () => {
  return (
    <>
      <Wrapper>
        <Button>
          <Title>상품설명</Title>
        </Button>
        <Button>
          <Title>선물후기</Title>
        </Button>
        <Button>
          <Title>상세정보</Title>
        </Button>
      </Wrapper>
    </>
  );
};

export default Tab;
