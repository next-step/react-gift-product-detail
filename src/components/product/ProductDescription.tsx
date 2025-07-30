type Props = {
  description: string;
};
const ProductDescription = ({ description }: Props) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: description }} style={{ wordBreak: 'break-word' }} />
  );
};

export default ProductDescription;
