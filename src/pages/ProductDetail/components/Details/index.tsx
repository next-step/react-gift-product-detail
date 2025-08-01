import { theme } from '@/theme/theme';
import styled from '@emotion/styled';
import Tab from './Tab';
import Content from './Content';
import { useState } from 'react';

const Section = styled.section`
  width: 100%;
  background-color: ${theme.semanticColors.background.default};
`;

const Container = styled.div`
  width: 100%;
`;

interface DetailSectionProps {
  productId: number;
}
const DetailSection = ({ productId }: DetailSectionProps) => {
  const [activeTab, setActiveTab] = useState<'explain' | 'review' | 'detail'>('explain');
  return (
    <>
      <Section>
        <Container>
          <Tab active={activeTab} onSelect={setActiveTab} />
          <Content active={activeTab} productId={productId} />
        </Container>
      </Section>
    </>
  );
};

export default DetailSection;
