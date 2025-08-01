import ThemesInfo from "@/pages/themes/components/ThemesInfo";
import ThemesProducts from "@/pages/themes/components/ThemesProducts";
import styled from "@emotion/styled";
import { useParams } from "react-router";

const ThemesPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Main>
      <ThemesInfo id={id} />
      <ThemesProducts id={id} />
    </Main>
  );
};

export default ThemesPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray.gray00};
  height: 100%;
  min-height: 100vh;
`;
