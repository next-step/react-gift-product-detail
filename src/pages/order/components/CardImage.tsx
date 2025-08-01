import styled from "@emotion/styled";

type CardImageProps = {
  imageUrl: string;
  defaultTextMessage: string;
};

const CardImage = ({ imageUrl, defaultTextMessage }: CardImageProps) => {
  return (
    <CardDiv>
      <Img src={imageUrl} alt={defaultTextMessage} />
    </CardDiv>
  );
};

export default CardImage;

const CardDiv = styled.div`
  height: 272px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.spacing4};
`;

const Img = styled.img`
  height: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
