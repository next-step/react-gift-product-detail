import { BE } from "@src/apis/BackEnd/apiEndPoints";
import { http, HttpResponse } from "msw";

export const PRODUCT_SUMMARY_ID = "11712379";
export const PRODUCT_SUMMARY_NAME = "부드러운 고구마 라떼 케이크";

const productSummary = http.get(
  BE.API.PRODUCT.SUMMARY(PRODUCT_SUMMARY_ID),
  () => {
    return HttpResponse.json({
      data: {
        id: PRODUCT_SUMMARY_ID,
        name: PRODUCT_SUMMARY_NAME,
        brandName: "뚜레쥬르",
        price: 26350,
        imageURL:
          "https://st.kakaocdn.net/product/gift/product/20250218142602_030fce0196af42189694554c03a54fbb.jpg"
      }
    });
  }
);

export default productSummary;
