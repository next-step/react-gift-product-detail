import type { ProductDetail } from '@/apis/domain/products/type';
import { HorizontalSpacing } from '@/components/common/Spacing/HorizontalSpacing';
import { Typography } from '@/components/common/Typography';
import styled from '@emotion/styled';

type Props = {
  announcements: ProductDetail['announcements'];
};

export const ProductDetailAnnouncements = ({ announcements }: Props) => {
  return (
    <Wrapper>
      {announcements.map((announcement) => (
        <div key={announcement.name}>
          <HorizontalSpacing size='spacing4' />
          <Typography variant='subtitle2Bold'>{announcement.name}</Typography>
          <HorizontalSpacing size='spacing2' />
          <Typography
            variant='body1Regular'
            style={{
              whiteSpace: 'pre-wrap',
            }}
          >
            {announcement.value}
          </Typography>
          <HorizontalSpacing size='spacing2' />
        </div>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
`;
