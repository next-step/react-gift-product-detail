import { QUERY_KEY } from "@/constants/queryKey";
import { getProductDetailInfo } from "@/data/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ListContainer,
  TabContentContainer,
  TabContentContent,
  TabContentTitle,
} from "./TabListContents.styles";

function Detail({ productId }: { productId: string }) {
  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.PRODUCT_DETAIL_INFO(productId),
    queryFn: () => getProductDetailInfo(productId),
  });

  return (
    <ListContainer>
      {data.announcements.map((el) => {
        return (
          <TabContentContainer>
            <TabContentTitle>{el.name}</TabContentTitle>
            <TabContentContent>{el.value}</TabContentContent>
          </TabContentContainer>
        );
      })}
    </ListContainer>
  );
}

export default Detail;
