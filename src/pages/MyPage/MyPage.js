import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
// import { useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// export default function MyPage() {
//   const auth = useContext(AuthContext)!;
//   const nav = useNavigate();
//   const onLogout = () => {
//     auth.logout();
//     nav('/login');
//   };
//   return (
//     <div className="p-4">
//       <h2>마이페이지</h2>
//       <p>환영합니다, {auth.user?.name}님</p>
//       <button onClick={onLogout}>로그아웃</button>
//     </div>
//   );
// }
// src/pages/MyPage/MyPage.tsx
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { AuthContext } from '@/context/AuthContext';
import { Typography } from '@/components/common/Typography';
export default function MyPage() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();
  const handleLogout = () => {
    logout();
    // 로그아웃 후 로그인 페이지로
    nav('/login');
  };
  return _jsxs(Container, {
    children: [
      _jsx(Typography, {
        as: 'h1',
        variant: 'title1Bold',
        color: 'default',
        children: '\uB9C8\uC774\uD398\uC774\uC9C0',
      }),
      _jsxs(Typography, {
        as: 'h1',
        color: 'default',
        children: [
          user?.name,
          '\uB2D8, \uC548\uB155\uD558\uC138\uC694!',
          _jsx('br', {}),
          '\uC774\uBA54\uC77C\uC8FC\uC18C\uB294 ',
          user?.email,
          ' \uC785\uB2C8\uB2E4.',
        ],
      }),
      _jsx(LogoutButton, { onClick: handleLogout, children: '\uB85C\uADF8\uC544\uC6C3' }),
    ],
  });
}
const Container = styled.div`
  padding: 2rem;
`;
const LogoutButton = styled.button(({ theme }) => ({
  marginTop: theme.spacing.spacing6,
  padding: theme.spacing.spacing3,
  color: theme.colors.scale.gray00,
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
}));
