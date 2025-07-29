import styled from '@emotion/styled';
import { Suspense } from 'react';
import CategoryContent from '@/components/CategorySection/CategoryContent';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { ERROR_MESSAGES } from '@/constants/validation';
import { loading } from '../common/Loading';

const CategoryGroup = () => {
  return (
    <Section>
      <TitleWrapper>
        <Title>선물 테마</Title>
      </TitleWrapper>
      <ErrorBoundary
        fallback={<EmptyText>{ERROR_MESSAGES.FAILED_TO_LOAD_THEMES}</EmptyText>}
      >
        <Suspense fallback={loading}>
          <CategoryContent />
        </Suspense>
      </ErrorBoundary>
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

const EmptyText = styled.p`
  ${({ theme }) => theme.typography.body.body2Regular};
  color: ${({ theme }) => theme.color.gray[500]};
  text-align: center;
  padding: ${({ theme }) => theme.spacing[6]};
`;
