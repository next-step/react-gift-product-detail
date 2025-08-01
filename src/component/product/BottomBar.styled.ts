import styled from "@emotion/styled";

export const BottomBarDiv = styled.div`
    width: 100%;
    max-width: 720px;
    height: 3.125rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: 0px auto;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    background-color: rgb(255, 255, 255);
    
    `

export const LikeButton = styled.button`
    width: 4rem;
    height: 3.125rem;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items : center;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 1);
`

export const OrderButton = styled.button`
    width: 100%;
    height: 50px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    background-color: rgb(254, 229, 0);
}
`

export const OrderButtonText = styled.p`
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.375rem;
    color: rgb(42, 48, 56);
    margin: 0px;
    text-align: left;
    `