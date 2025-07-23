import styled from "@emotion/styled";
import { useProductInfo } from "@src/hooks/useProductInfo";
import { useParams } from "react-router-dom";

function Detail() {
  const productId = useParams().id ?? "";
  const productInfo = useProductInfo(productId);
  const sortedAnnouncements = productInfo.detailInfo.announcements.sort(
    (a, b) => a.displayOrder - b.displayOrder
  );
  return (
    <DetailWrapper>
      {sortedAnnouncements.map((announcement) => {
        return (
          <AnnouncementBox key={announcement.displayOrder}>
            <AnnouncementName>{announcement.name}</AnnouncementName>
            <AnnouncementValue>{announcement.value}</AnnouncementValue>
          </AnnouncementBox>
        );
      })}
    </DetailWrapper>
  );
}

const AnnouncementName = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin: 5px;
`;

const AnnouncementBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const AnnouncementValue = styled.div`
  padding: 1px;
`;

const DetailWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default Detail;
