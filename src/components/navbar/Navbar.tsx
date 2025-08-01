import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import arrowLeftIcon from '../../assets/icons/arrow_left.svg';
import myIcon from '../../assets/icons/my.svg';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTE_PATH } from '@/routes/Router';
const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const NavbarWrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${({ theme }) => theme.spacing.spacing3};
    height: 2.75rem;
    background-color: ${({ theme }) => theme.colors.gray};
  `;
  const Button = styled.button`
    width: ${({ theme }) => theme.spacing.spacing7};
    height: ${({ theme }) => theme.spacing.spacing7};
  `;
  const handleLink = (path: string) => {
    navigate(path);
  };
  const handleMyBtn = () => {
    if (!user.isLoggedIn) handleLink(ROUTE_PATH.LOGIN);
    else {
      handleLink(ROUTE_PATH.MY);
    }
  };
  return (
    <NavbarWrapper>
      <div>
        <Button aria-label="뒤로 가기"
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={arrowLeftIcon} alt="뒤로 가기 버튼" />
        </Button>
      </div>
      <div>선물하기</div>
      <div>
        <Button aria-label="마이페이지" onClick={handleMyBtn}>
          <img src={myIcon} alt="마이페이지 버튼" />
        </Button>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
