import type { ProductAnnouncement } from '@/types/DTO/productDTO';
import { DetailAuthor, DetailContainer, DetailItem } from '@/styles/Product/Detail.styles';

interface DetailProps {
  detailInfo: ProductAnnouncement[] | undefined;
}

function Detail({ detailInfo }: DetailProps) {
  if (!detailInfo || detailInfo.length === 0) {
    return (
      <DetailContainer>
        <p>상세 정보가 없습니다.</p>
      </DetailContainer>
    );
  }

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
