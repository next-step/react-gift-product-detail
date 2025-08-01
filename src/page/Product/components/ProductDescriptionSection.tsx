import useProductSummary from '@/hooks/useProductSummary';

interface ProductDescriptionSectionProps {
  index: number;
}
const ProductDescriptionSection = ({ index }: ProductDescriptionSectionProps) => {
  const data = useProductSummary(index);
  return (
    <div>
      <div>
        <div>
          <div>
            <p>
              <img src={data?.imageURL} alt={data?.name}></img>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescriptionSection;
