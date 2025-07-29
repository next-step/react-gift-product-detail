import { Padding4, Padding2 } from '@/components/common/Padding';

export type Review = {
  id: string;
  authorName: string;
  content:string;
};

type Props = {
  reviews: Review[];
};

const GiftReview = ({ reviews }: Props) => {
  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id}>
          <Padding4 />
          <p>{review.authorName}</p>
          <Padding2 />
          <p>{review.content}</p>
          <Padding2 />
        </div>
      ))}
    </div>
  );
};

export default GiftReview;
