import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography } from '@/components/common/Typography';
import styled from '@emotion/styled';
export const SelectThemeSectionListItem = ({ image, label, onClick }) => {
    return (_jsxs(Wrapper, { onClick: onClick, children: [_jsx(Image, { src: image, alt: label }), _jsx(Typography, { as: 'p', variant: 'label2Regular', color: 'default', children: label })] }));
};
const Wrapper = styled.div `
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  cursor: pointer;
`;
const Image = styled.img `
  max-width: 3.125rem;
  max-height: 3.125rem;
  width: 100%;
  border-radius: 18px;
  object-fit: cover;
  overflow: hidden;
`;
