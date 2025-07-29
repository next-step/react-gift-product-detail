import { useProductDetail } from '@/hooks/useProduct';

import Gap from '@/components/common/Gap.style';
import { Image, Description } from '@/components/product/ProductDescription.style';

interface ProductDescriptionProps {
  productId: number;
}

const ProductDescription = ({ productId }: ProductDescriptionProps) => {
  const { data } = useProductDetail(productId);

  const wrapper = document.createElement('div');
  wrapper.innerHTML = data.description;

  const imgElement = wrapper.querySelector('img');
  const textElements = Array.from(wrapper.querySelectorAll('p'))
    .map((el) => el.textContent?.trim())
    .filter(Boolean)
    .join('\n');

  return (
    <>
      {imgElement?.getAttribute('src') && (
        <Image src={imgElement.getAttribute('src')!} alt="상품 이미지" />
      )}
      <Description>{textElements}</Description>
      <Gap height={20} />
    </>
  );
};

export default ProductDescription;
