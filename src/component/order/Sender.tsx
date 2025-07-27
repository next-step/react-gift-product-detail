import { useOrder } from '@/context/OrderContext';
import { DefaultComponentDiv, ErrorText, Gap, SideBlankDiv, SimpleInput, SubText, SubTitle } from '@/styles/CommomStyle/Common.styled';



const Sender = () => {
    const { ordererName } = useOrder();
    const { value, onChange, error } = ordererName
    return (
        <DefaultComponentDiv>
            <SideBlankDiv>
                <Gap height={8}  />
                <SubTitle>보내는 사람</SubTitle>
                <Gap height={12}  />
                <SimpleInput
                    type="text"
                    placeholder="이름을 입력하세요."
                    value={value}
                    onChange={onChange}
                />
                {!error ? (
                    <>
                        <Gap height={4}  />
                        <SubText>* 실제 선물 발송 시 발신자 이름으로 반영되는 정보입니다.</SubText>
                    </>

                ) : (
                    <>
                        <Gap height={4}  />
                        <ErrorText>{error}</ErrorText>
                    </>
                )}
                <Gap height={24}  />
            </SideBlankDiv>
        </DefaultComponentDiv>
    );
};

export default Sender;