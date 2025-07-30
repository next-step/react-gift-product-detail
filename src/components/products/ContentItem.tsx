import styled from "@emotion/styled";

type ContentItemProps = {
  title: string;
  content: string;
};

const ContentItem = ({ title, content }: ContentItemProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </Container>
  );
};

export default ContentItem;

const Container = styled.div`
  margin: ${({ theme }) =>
    `${theme.spacing.spacing4} 0 ${theme.spacing.spacing2}`};
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.typography.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Bold.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
`;

const Content = styled.p`
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.default};
`;
