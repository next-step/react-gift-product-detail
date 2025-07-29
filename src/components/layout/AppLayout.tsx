import styled from "@emotion/styled";
import TheHeader from "./TheHeader";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Background>
      <Container>
        <TheHeader />
        {children}
      </Container>
    </Background>
  );
}

export default AppLayout;

const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray.gray100};
`;
const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.gray.gray200};
`;
