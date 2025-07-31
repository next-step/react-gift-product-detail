import styled from "@emotion/styled";

export const Footer = styled.footer`
    position: fixed;
    bottom: 0;

    width: 100%;
    height: 48px;

    display: flex;
`;

export const WishButton = styled.button`
    height: 100%;
    aspect-ratio: 1/1;

    background-color: #fff;
    border: none;

    cursor: pointer;
`;

export const WishCount = styled.p`
    font-size: ${({ theme }) => theme.typography.label.label2Regular.size};
    font-weight: ${({ theme }) => theme.typography.label.label2Regular.weight};
`;

export const OrderButton = styled.button`
    width: 100%;
    height: 48px;

    border: none;
    background-color: #fee500;

    font-weight: ${({ theme }) => theme.typography.label.label1Bold.weight};

    cursor: pointer;
`;
