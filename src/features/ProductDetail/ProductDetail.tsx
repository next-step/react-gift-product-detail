import { useState } from 'react';
import ProductInfo from './components/ProductInfo';
import TabMenu from './components/TabMenu';
import Description from './components/TabContent/Description';
import Review from './components/TabContent/Review';
import DetailInfo from './components/TabContent/DetailInfo';
import FixedBottonBar from './components/FixedBottonBar';
import { useParams } from 'react-router-dom';

type ProductDetailTab = 'description' | 'review' | 'detailInfo';
const ProductDetail = () => {
  const { id } = useParams();
  console.log(id);
  const [activeTab, setActiveTab] = useState<ProductDetailTab>('description');

  return (
    <>
      <div>
        <ProductInfo />
        <TabMenu />
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
