import { CardTemplete } from '@/mock/CardTemplete';
import { CentorAlignDiv, DefaultComponentDiv, Gap, LowSlideDiv, SideBlankDiv } from '@/styles/CommomStyle/Common.styled';
import { useState } from 'react'
import { CardBiGImg, CardBiGImgDiv, CardMessage, CardMiniImg } from './PresentCardSelector.styled';
import { useOrder } from '@/context/OrderContext';



const PresentCardSelector= () => {
  const {message, setMessage,setMessageCardId} = useOrder()
  const [selectedCard, setSelectedCard] = useState(CardTemplete[0]);

  return (
    <DefaultComponentDiv>
      <LowSlideDiv>
        {CardTemplete.map((card, i) => (
          <CardMiniImg
            key={card.id}
            src={card.thumbUrl}
            alt={card.defaultTextMessage}
            onClick={() => {
              setMessageCardId(`card${i}`)
              setSelectedCard(card)
              setMessage(card.defaultTextMessage)
              }
            }
            selected={selectedCard === card}
          />
        ))}
      </LowSlideDiv>

      <Gap height={8} />

      <CentorAlignDiv>
      <CardBiGImgDiv>
        <CardBiGImg
          src={selectedCard.imageUrl}
          alt={selectedCard.imageUrl}
        />
      </CardBiGImgDiv>
      </CentorAlignDiv>

      <Gap height={40} />

      <SideBlankDiv style={{ marginTop: '16px' }}>
        <CardMessage
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력해주세요."
        />
      </SideBlankDiv>

      <Gap height={40} />

    </DefaultComponentDiv>
  );
}

export default PresentCardSelector