import styled from '@emotion/styled';
import CategoryContent from '@/components/CategorySection/CategoryContent';
import TabPanel from '@/components/common/TabPanel';
import { ERROR_MESSAGES } from '@/constants/validation';

const CategoryGroup = () => {
  return (
    <Section>
      <TitleWrapper>
        <Title>선물 테마</Title>
      </TitleWrapper>
      <TabPanel fallbackMessage={ERROR_MESSAGES.FAILED_TO_LOAD_THEMES}>
        <CategoryContent />
      </TabPanel>
    </Section>
  );
};

export default CategoryGroup;

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const TitleWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => `${theme.spacing[0]} ${theme.spacing[1]}`};
`;

const Title = styled.h3`
  ${({ theme }) => theme.typography.title.title1Bold};
`;
