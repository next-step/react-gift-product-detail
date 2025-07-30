import styled from "@emotion/styled";
import { useProductWish } from "@/hooks/useProductWish";
import { useWishUpdate } from "@/hooks/useWishUpdate";

export default function WishButton({ productId }: { productId: string }) {
  const { data: wishData } = useProductWish(productId);
  const { mutate } = useWishUpdate(productId);

  const handleClick = () => {
    mutate();
  };

  return (
    <LikeButton onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={wishData?.isWished ? "red" : "none"}
        stroke={wishData?.isWished ? "red" : "#2a3038"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
      <LikeNum>{wishData?.wishCount ?? 0}</LikeNum>
    </LikeButton>
  );
}

const LikeButton = styled.button`
  width: 4rem;
  height: 3.125rem;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
  border: none;
  cursor: pointer;
`;

const LikeNum = styled.p`
  font-size: 0.625rem;
  font-weight: 400;
  line-height: 1rem;
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  text-align: left;
`;
