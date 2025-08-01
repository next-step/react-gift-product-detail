import theme from "@/styles/theme";
import styled from "@emotion/styled";

export const DetailOption = styled.div`
    display: flex;
    position: relative;
    border-bottom: 1px solid ${theme.colors.gray200};
`
export const DetailOptionButton = styled.button`
    position: relative;
    padding: 16px 20px;
    background: none;
    border: none;
    cursor: pointer;
    opacity: 1;
    transition: 0.2s;
    width: 100%;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    flex: 1%;
`
export const DetailOptionText = styled.p<{ activate: boolean }>`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.375rem;
    color: ${({ activate }) => activate ? theme.colors.gray1000 : theme.colors.gray600};
    margin: 0px;
    text-align: left;
`

export const HighLightLine = styled.div`
    position: absolute;
    bottom: -1px;
    left: 0px;
    right: 0px;
    height: 2px;
    background-color: ${theme.colors.gray1000};
`
export const NameText = styled.p`
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.1875rem;
    color: rgb(42, 48, 56);
    margin: 0px;
    text-align: left;
`
export const DescriptionText = styled.p`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.375rem;
    color: rgb(42, 48, 56);
    margin: 0px;
    text-align: left;
`

export const PrdocutDescriptionDiv = styled.div`
    white-space: pre-wrap;
    max-width: 100%;
    width: 100%;
    overflow-y: hidden;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.375rem;
`