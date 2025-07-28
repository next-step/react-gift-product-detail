import { useState } from 'react';
import ProductInfo from './components/ProductInfo';
import TabMenu from './components/TabMenu';
import Description from './components/TabContent/Description';
import Review from './components/TabContent/Review';
import DetailInfo from './components/TabContent/DetailInfo';
import FixedBottonBar from './components/FixedBottonBar';
import { useParams } from 'react-router-dom';
import type { ProductBasicInfo } from 'src/types/product';
import Divider from '@components/common/Divider';

const mockData: ProductBasicInfo = {
  id: 123,
  name: 'BBQ 양념치킨+크림치즈볼+콜라1.25L',
  imageURL:
    'https://st.kakaocdn.net/product/gift/product/20231030175450_53e90ee9708f45ffa45b3f7b4bc01c7c.jpg',
  price: {
    basicPrice: 29000,
    discountRate: 0,
    sellingPrice: 29000,
  },
  brandInfo: {
    id: 2088,
    name: 'BBQ',
    imageURL:
      'https://st.kakaocdn.net/product/gift/gift_brand/20220216170226_38ba26d8eedf450683200d6730757204.png',
  },
};

export type ProductDetailTab = 'description' | 'review' | 'detailInfo';
const ProductDetail = () => {
  const { id } = useParams();
  console.log(id);
  const [activeTab, setActiveTab] = useState<ProductDetailTab>('description');

  return (
    <>
      <div>
        <ProductInfo product={mockData} />
        <Divider />
        <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
        <div>
          {activeTab == 'description' && <Description />}
          {activeTab == 'review' && <Review />}
          {activeTab == 'detailInfo' && <DetailInfo />}
        </div>
      </div>
      <FixedBottonBar />
    </>
  );
};

export default ProductDetail;
