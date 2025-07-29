import { useNavigate } from "react-router-dom";
import Layout from "@/layout";
import {
  NotFoundContainer,
  CharacterImage,
  HomeButton,
} from "./NotFoundPage.styles";
import { NOT_FOUND_LABELS } from "./constants/labels";
import ErrorImage from "./assets/error.png";
import { Typography } from "@/components/Typography/Typography";

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <Layout>
      <NotFoundContainer>
        <CharacterImage src={ErrorImage} alt="Error Character" />

        <Typography
          variant="title1Bold"
          as="h1"
          color="default"
          textAlign="center"
          style={{ marginBottom: "0.75rem" }}
        >
          {NOT_FOUND_LABELS.MAIN_MESSAGE}
        </Typography>

        <Typography
          variant="body1Regular"
          as="p"
          color="sub"
          textAlign="center"
          style={{ marginBottom: "3.5rem" }}
        >
          {NOT_FOUND_LABELS.SUB_MESSAGE}
        </Typography>

        <HomeButton onClick={handleGoHome}>
          {NOT_FOUND_LABELS.HOME_BUTTON}
        </HomeButton>
      </NotFoundContainer>
    </Layout>
  );
}

export default NotFoundPage;
