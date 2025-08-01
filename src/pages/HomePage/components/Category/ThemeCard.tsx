import { ROUTES } from "@/constants/routes";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Typography } from "@/components/Typography/Typography";

const ThemeCardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;

  padding-top: ${({ theme }) => theme.spacing[0]};
  padding-bottom: ${({ theme }) => theme.spacing[2]};
  box-sizing: border-box;

  width: 8rem;
  height: 5rem;

  cursor: pointer;
`;

const ThemeImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 30%;
`;

function ThemeCard({
  themeId,
  name,
  image,
}: {
  themeId: number;
  name: string;
  image: string;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.THEME_PRODUCTS.replace(":themeId", themeId.toString()));
  };

  return (
    <ThemeCardContainer onClick={handleClick}>
      <ThemeImage src={image} alt={name} />
      <Typography variant="label2Regular" as="p">
        {name}
      </Typography>
    </ThemeCardContainer>
  );
}

export default ThemeCard;
