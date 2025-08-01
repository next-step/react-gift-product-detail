import styled from "@emotion/styled";
import { Typography } from "@/components/Typography/Typography";

const EmptyProductWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 125px;
  margin-bottom: 125px;
`;

interface EmptyProductContainerPropsType {
  label: string;
}

function EmptyProductContainer({ label }: EmptyProductContainerPropsType) {
  return (
    <EmptyProductWrapper>
      <Typography variant="label1Regular" as="p">
        {label}
      </Typography>
    </EmptyProductWrapper>
  );
}

export default EmptyProductContainer;
