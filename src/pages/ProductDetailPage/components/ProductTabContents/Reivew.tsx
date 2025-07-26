import { QUERY_KEY } from "@/constants/queryKey";
import { getProductHighlightReview } from "@/data/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ListContainer,
  TabContentContainer,
  TabContentContent,
  TabContentTitle,
} from "./TabListContents.styles";

function Review({ productId }: { productId: string }) {
  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.PRODUCT_HIGHLIGHT_REVIEW(productId),
    queryFn: () => getProductHighlightReview(productId),
  });

  return (
    <ListContainer>
      {data.reviews.map((el) => (
        <TabContentContainer>
          <TabContentTitle>{el.authorName}</TabContentTitle>
          <TabContentContent>{el.content}</TabContentContent>
        </TabContentContainer>
      ))}
    </ListContainer>
  );
}

export default Review;
