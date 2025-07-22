import styled from "@emotion/styled";
import theme from "@src/styles/kakaoTheme";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PATH } from "@src/router/Router";
import { useProductInfo } from "@src/hooks/useProductInfo";

function FooterPanel() {
  const productId = useParams().id ?? "";
  const navigate = useNavigate();
  const productInfo = useProductInfo(productId);
  const [liked, setLiked] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setLiked(productInfo.wishInfo.isWished);
    setCount(productInfo.wishInfo.wishCount);
  }, [productInfo.wishInfo?.isWished, productInfo.wishInfo?.wishCount]);

  return (
    <FooterPanelWrapper>
      <HorizontalLayout>
        <LikeButton onClick={() => setLiked(!liked)}>
          <VerticalLayout>
            {liked ? (
              <FavoriteIcon sx={{ color: theme.colors.red.red700 }} />
            ) : (
              <FavoriteBorderIcon />
            )}
            <SubCount>{count + (liked ? 1 : 0)}</SubCount>
          </VerticalLayout>
        </LikeButton>
        <OrderButton onClick={() => navigate(PATH.ORDER + `/${productId}`)}>
          주문하기
        </OrderButton>
      </HorizontalLayout>
    </FooterPanelWrapper>
  );
}

const SubCount = styled.div`
  font-size: 12px;
`;

const LikeButton = styled.div`
  flex: 1;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const OrderButton = styled.div`
  flex: 9;
  background-color: ${theme.colors.yellow.yellow500};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  font-weight: bold;
  cursor: pointer;
`;

const HorizontalLayout = styled.div`
  display: flex;
`;

const VerticalLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FooterPanelWrapper = styled.div`
  width: 100%;
  position: sticky;
  bottom: 0;
`;

export default FooterPanel;
