import styled from "@emotion/styled";

export const TabContainer = styled.ul`
    display: flex;
`;

export const TabItem = styled.li<{ active?: boolean }>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    height: 54px;

    border-bottom: ${({ active }) => {
        return active ? `2px solid #000` : "none";
    }};

    color: ${({ active, theme }) => {
        return active ? "#000" : theme.colors.gray.gray500;
    }};

    cursor: pointer;
`;
