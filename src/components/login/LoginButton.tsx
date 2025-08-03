import { Button } from '@/components/login/LoginButton.style';
interface LoginButtonProps {
  disabled: boolean;
}

const LoginButton = ({ disabled }: LoginButtonProps) => {
  return (
    <Button type="submit" disabled={disabled}>
      로그인
    </Button>
  );
};

export default LoginButton;
