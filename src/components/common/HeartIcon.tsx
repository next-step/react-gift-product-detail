import { FiHeart } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";

const HeartIcon = ({ isWished }: { isWished: boolean }) =>
  isWished ? (
    <AiFillHeart size={24} color="#FEE500" />
  ) : (
    <FiHeart size={24} color="#191919" />
  );

export default HeartIcon;
