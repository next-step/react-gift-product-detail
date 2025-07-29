import styled from "@emotion/styled";
import { Typography } from "@/components/Typography/Typography";

export function FallbackMessage({ message }: { message: string }) {
  return (
    <ErrorContainer>
      <Typography variant="label1Regular" as="p">
        {message}
      </Typography>
    </ErrorContainer>
  );
}

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 124px;
  margin-bottom: 124px;
`;
