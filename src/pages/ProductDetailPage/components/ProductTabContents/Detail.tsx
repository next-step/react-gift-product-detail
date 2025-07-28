import {
  ListContainer,
  TabContentContainer,
  TabContentContent,
  TabContentTitle,
} from "./TabListContents.styles";
import type { ProductDetailInfo } from "@/types/ProductDetail";

function Detail({ product }: { product: ProductDetailInfo }) {
  return (
    <ListContainer>
      {product.announcements.map((el) => {
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
