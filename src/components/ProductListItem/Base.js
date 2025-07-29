import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from '@emotion/styled';
import { HorizontalSpacing } from '../common/Spacing/HorizontalSpacing';
import { Typography } from '../common/Typography';
export const BaseProductListItem = ({ imageSrc, title, subtitle, amount, ...props }) => {
    return (_jsxs(Wrapper, { ...props, children: [_jsx(Image, { src: imageSrc, alt: title }), _jsx(HorizontalSpacing, { size: 'spacing3' }), _jsx(Typography, { as: 'p', variant: 'label1Regular', color: 'gray600', style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, children: subtitle }), _jsx(Title, { as: 'h6', variant: 'label1Regular', color: 'gray900', style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, children: subtitle }), _jsx(HorizontalSpacing, { size: 'spacing1' }), _jsxs(Amount, { as: 'p', variant: 'title2Bold', color: 'gray900', children: [amount, " ", _jsx("span", { children: "\uC6D0" })] })] }));
};
const Wrapper = styled.div `
  width: 100%;
`;
const Image = styled.img `
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 4px;
  aspect-ratio: '1/1';
  overflow: hidden;
`;
const Title = styled(Typography) `
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const Amount = styled(Typography) `
  word-break: break-word;

  & > span {
    font-weight: 400;
  }
`;
