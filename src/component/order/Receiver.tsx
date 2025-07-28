import {
  DefaultComponentDiv,
  FlatLowField,
  Gap,
  ListBody,
  ListTop,
  ReceiverEmpty,
  ReceiverList,
  SideBlankDiv,
  SimpleButton,
  SubText,
  SubTitle,
} from '@/styles/CommomStyle/Common.styled';
import { useState } from 'react';
import ReceiverModal from './ReceiverModal';
import { useReceiver } from '@/context/ReceiverContext';

const Receiver = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { receivers } = useReceiver();
  return (
    <DefaultComponentDiv>
      <Gap height={8}  />
      <SideBlankDiv>
        <FlatLowField>
          <SubTitle>받는 사람</SubTitle>
          <SimpleButton onClick={() => setIsOpen(true)}>추가</SimpleButton>
        </FlatLowField>
        <Gap height={12}  />

        {receivers.length == 0 ? (
          <ReceiverEmpty>
            <SubText style={{ textAlign: 'center' }}>
              받는 사람이 없습니다 <br />
              받는사람을 추가해주세요
            </SubText>
          </ReceiverEmpty>
        ) : (
          <ReceiverList>
            <ListTop>
                <p>이름</p>
                <p>전화번호</p>
                <p>수량</p>
                
            </ListTop>
            {receivers.map((receiver, i) => (
              <ListBody key={i}>
                <p>{receiver.name}</p> 
                <p>{receiver.phoneNumber} </p>
                <p>{receiver.quantity}</p>
              </ListBody>
            ))}
          </ReceiverList>
        )}

        <ReceiverModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
        <Gap height={8}  />
      </SideBlankDiv>
      <Gap height={24}  />
    </DefaultComponentDiv>
  );
};

export default Receiver;
