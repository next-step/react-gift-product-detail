import styled from '@emotion/styled';

const Wrapper = styled.section``;

const Tabs = styled.div`
  display: flex;
  background: #fff;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]};
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 16px 20px;
  text-align: center;
  border: none;
  border-bottom: 2px solid ${({ active }) => (active ? '#000' : 'transparent')};
  color: ${({ theme, active }) => (active ? '#000' : theme.colors.gray[600])};
  ${({ theme }) => theme.typography.body1Regular};
  cursor: pointer;
`;

const TabContent = styled.div`
  background: #fff;
  padding: 16px;
`;

type TabType = 'description' | 'review' | 'detail';

interface ProductTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function ProductTabs({ activeTab, setActiveTab }: ProductTabsProps) {
  return (
    <Wrapper>
      <Tabs>
        <Tab active={activeTab === 'description'} onClick={() => setActiveTab('description')}>
          상품설명
        </Tab>
        <Tab active={activeTab === 'review'} onClick={() => setActiveTab('review')}>
          선물후기
        </Tab>
        <Tab active={activeTab === 'detail'} onClick={() => setActiveTab('detail')}>
          상세정보
        </Tab>
      </Tabs>

      <TabContent>
        {activeTab === 'description' && <div>상품설명 콘텐츠 영역</div>}
        {activeTab === 'review' && <div>선물후기 콘텐츠 영역</div>}
        {activeTab === 'detail' && <div>상세정보 콘텐츠 영역</div>}
      </TabContent>
    </Wrapper>
  );
}
