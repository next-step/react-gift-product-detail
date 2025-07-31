import styled from '@emotion/styled';
import type { ProductDetailInfo } from 'src/types/product';

interface DetailInfoProps {
  productDetailInfo: ProductDetailInfo;
}

const DetailInfo = ({ productDetailInfo }: DetailInfoProps) => {
  const announcements = productDetailInfo.announcements;
  return (
    <Container>
      {announcements.map((announcement) => (
        <ReviewItem key={announcement.displayOrder}>
          <Name>{announcement.name}</Name>
          <Content>{announcement.value}</Content>
        </ReviewItem>
      ))}
    </Container>
  );
};

export default DetailInfo;

const Container = styled.div(({ theme }) => ({
  padding: theme.spacing.spacing5,
}));

const ReviewItem = styled.div(({ theme }) => ({
  marginBottom: theme.spacing.spacing7,
}));

const Name = styled.p(({ theme }) => ({
  ...theme.typography.body1Bold,
  marginBottom: theme.spacing.spacing3,
}));

const Content = styled.p(({ theme }) => ({
  ...theme.typography.body1Regular,
}));
