import { render, screen, waitFor } from '@/tests/test-utils';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './index';
import { requests } from '@/api/requests';
import HOME from '../Home';
import { ROUTE_PATH } from '@/routes/routePath';
import MyPage from '../My';

vi.mock('@/api/requests');

// 테스트 환경에서 사용할 라우터 설정
const renderWithRouter = () => {
  return render(
    <MemoryRouter initialEntries={[ROUTE_PATH.LOGIN]}>
      <Routes>
        <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
        <Route path={ROUTE_PATH.HOME} element={<HOME />} />
        <Route path={ROUTE_PATH.MY} element={<MyPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('로그인 페이지 - 통합 테스트', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    vi.clearAllMocks();
    user = userEvent.setup();
  });


  it('GIVEN: 올바른 정보를, WHEN: 입력하고 제출하면, THEN: 홈페이지로 이동해야 한다.', async () => {
    vi.mocked(requests.fetchUserInfos).mockResolvedValue({
      authToken: 'fake-token',
      name: '테스트 유저',
      email: 'test@example.com',
    });

    renderWithRouter();
    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const loginButton = screen.getByRole('button', { name: '로그인' });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.tab(); 
    await user.click(loginButton);


    await waitFor(() => {
      expect(window.location.pathname).toBe(ROUTE_PATH.HOME);
    });
 
    expect(requests.fetchUserInfos).toHaveBeenCalledTimes(1);
  });

  it('GIVEN: 유효하지 않은 이메일을, WHEN: 입력하고 제출하면, THEN: 에러 메시지를 보여줘야 한다.', async () => {
    renderWithRouter();
    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const loginButton = screen.getByRole('button', { name: '로그인' });

    await user.type(emailInput, 'invalid-email');
    await user.type(passwordInput, 'password123');
    await user.tab(); // blur
    await user.click(loginButton);


    const errorMessage = await screen.findByText('ID는 이메일 형식으로 입력해주세요.');
    expect(errorMessage).toBeInTheDocument();

    expect(requests.fetchUserInfos).not.toHaveBeenCalled();
  });
});
