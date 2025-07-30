import { DescriptionWrapper } from '@/components/ProductDetail/ProductMain/Detail/ProductDescription.style.ts';

interface ProductDescriptionProps {
  data?: {
    description: string;
  };
}

export default function ProductDescription({ data }: ProductDescriptionProps) {
  if (!data) return null;
  return <DescriptionWrapper dangerouslySetInnerHTML={{ __html: data.description }} />;
}
