import type { ProductAnnouncement } from '@/types/DTO/productDTO';
import { DetailAuthor, DetailContainer, DetailItem } from '@/styles/Product/Detail.styles';

interface DetailProps {
  detailInfo: ProductAnnouncement[];
}

function Detail({ detailInfo }: DetailProps) {

  return (
    <DetailContainer>
      {detailInfo.map((info) => (
        <DetailItem key={info.displayOrder}>
          <DetailAuthor>{info.name}</DetailAuthor>
          <p>{info.value}</p>
        </DetailItem>
      ))}
    </DetailContainer>
  );
}

export default Detail;
