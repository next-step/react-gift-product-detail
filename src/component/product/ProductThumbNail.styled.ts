import styled from "@emotion/styled";


export const ProductImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 1 / 1;
    background-color: rgb(243, 244, 245);
    `

export const BrandDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
`

export const BrandLogo = styled.img`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    object-fit: cover;
    aspect-ratio: 1 / 1;
`
export const BrandLogoP = styled.p`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    color: rgb(42, 48, 56);
    margin: 0px;
    text-align: left;
`