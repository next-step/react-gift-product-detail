import {
  ListContainer,
  TabContentContainer,
  TabContentContent,
  TabContentTitle,
} from "./TabListContents.styles";
import type { ProductHighlightReview } from "@/types/HighlighReview";

function Review({ product }: { product: ProductHighlightReview }) {
  return (
    <ListContainer>
      {product.reviews.map((el) => (
        <TabContentContainer>
          <TabContentTitle>{el.authorName}</TabContentTitle>
          <TabContentContent>{el.content}</TabContentContent>
        </TabContentContainer>
      ))}
    </ListContainer>
  );
}

export default Review;
