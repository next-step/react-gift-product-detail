import styled from '@emotion/styled';

const MainImage = styled.img`
  width: 100%;
  max-width: 300px;
  display: block;
  margin: 0 auto ${({ theme }) => theme.spacing.spacing4};
`;

type Props = {
  imageUrl?: string;
};

const SelectedCardImage = ({ imageUrl }: Props) => {
  if (!imageUrl) {
    return null;
  }

  return <MainImage src={imageUrl} alt="선택된 메시지 카드" />;
};

export default SelectedCardImage;
