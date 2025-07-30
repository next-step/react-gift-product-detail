import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 750px;
  height: 3.125rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 0 16px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 100;
`;

export const WishBox = styled.div`
  width: 4rem;
  height: 3.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`;

export const WishCount = styled.div`
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgb(42, 48, 56);
  text-align: center;
`;

export const OrderButton = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 0;
  background-color: rgb(254, 229, 0);
`;

export const OrderText = styled.div`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.375rem;
  color: rgb(42, 48, 56);
  margin: 0px;
  text-align: left;
`;