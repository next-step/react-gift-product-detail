import useProductQuery from '../hooks/useProductQuery';

interface ProductSectionProps {
  index: number;
}

const ProductSection = ({ index }: ProductSectionProps) => {
  const data = useProductQuery(index);

  return (
    <section>
      <img src={data.imageURL} alt={data.name} />
      <h3>{data.name}</h3>
      <p>{data.price.basicPrice} 원</p>
      <div>
        <img src={data.brandInfo.imageURL} alt={data.brandInfo.name} />
        <p>{data.brandInfo.name}</p>
      </div>
    </section>
  );
};

export default ProductSection;
