import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from '@emotion/styled';
import { Typography } from '@/components/common/Typography';
export const ProductCard = ({ image, name, price, brandName, onClick, }) => {
    return (_jsxs(Card, { onClick: onClick, children: [_jsx(ImageWrapper, { children: _jsx(Image, { src: image, alt: name }) }), _jsxs(Content, { children: [_jsx(Typography, { as: "p", variant: "body1Regular", color: "gray500", children: brandName }), _jsx(Typography, { as: "p", variant: "body1Bold", color: "default", children: name }), _jsxs(Typography, { as: "p", variant: "body1Regular", color: "sub", children: ["\u20A9", price.toLocaleString()] })] })] }));
};
const Card = styled.div `
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;
const ImageWrapper = styled.div `
  width: 100%;
  padding-top: 75%; /* 4:3 비율 */
  position: relative;
  background: #f5f5f5;
`;
const Image = styled.img `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Content = styled.div `
  padding: 12px;
`;
