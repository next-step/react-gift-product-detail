import Container from "@/components/common/Container";
import Themes from "@/pages/Gift/components/Themes";
import Ranking from "@/pages/Gift/components/Ranking";
import Friend from "@/pages/Gift/components/Friend";
import Divider from "@/components/common/Divider";
import Banner from "@/pages/Gift/components/Banner";

const GiftPage = () => {
  return (
    <Container>
      <Friend />
      <Divider />
      <Themes />
      <Divider />
      <Banner />
      <Divider />
      <Ranking />
    </Container>
  );
};

export default GiftPage;
