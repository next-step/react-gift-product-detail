import styled from '@emotion/styled/macro';

const Container = styled.div`
  min-height: 400px;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Content = () => {
  return (
    <>
      <Container>
        <Wrapper></Wrapper>
      </Container>
    </>
  );
};

export default Content;
