import styled from "@emotion/styled";

export const Container = styled.section`
    width: 100%;
    max-width: 100%;
    padding: 16px;

    overflow: hidden;
    word-wrap: break-word;
    word-break: break-word;

    * {
        max-width: 100%;
        box-sizing: border-box;
    }

    img {
        max-width: 100%;
        height: auto;
        object-fit: contain;
    }

    video,
    iframe,
    embed,
    object {
        max-width: 100%;
        height: auto;
    }
`;
