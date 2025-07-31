import { theme } from '@/theme/theme';
import styled from '@emotion/styled';

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
  :hover {
    background-color: ${theme.semanticColors.background.fill};
  }
`;

interface TitleProps {
  selected?: boolean;
}

const Title = styled.p<TitleProps>`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.375rem;
  margin: 0px;
  text-align: left;
  color: ${({ selected, theme }) =>
    selected ? theme.semanticColors.text.default : theme.semanticColors.text.sub};
`;

const SelectedTab = styled.div`
  position: absolute;
  bottom: -1px;
  left: 0px;
  right: 0px;
  height: 2px;
  background-color: rgb(42, 48, 56);
`;

interface TabProps {
  active: 'explain' | 'review' | 'detail';
  onSelect: (key: 'explain' | 'review' | 'detail') => void;
}

const Tab = ({ active, onSelect }: TabProps) => (
  <Wrapper>
    <Button onClick={() => onSelect('explain')}>
      <Title selected={active === 'explain'}>상품설명</Title>
      {active === 'explain' && <SelectedTab />}
    </Button>
    <Button onClick={() => onSelect('review')}>
      <Title selected={active === 'review'}>선물후기</Title>
      {active === 'review' && <SelectedTab />}
    </Button>
    <Button onClick={() => onSelect('detail')}>
      <Title selected={active === 'detail'}>상세정보</Title>
      {active === 'detail' && <SelectedTab />}
    </Button>
  </Wrapper>
);

export default Tab;
