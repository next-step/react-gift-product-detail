import styled from '@emotion/styled';
import Loading from '@/components/Loading';
import { ROUTE_PATH } from '@/routes/routePath';
import { generatePath, useNavigate } from 'react-router-dom';
import useThemes from '../../hooks/useThemes';

const ThemeList = () => {
  const { themes, loading, error } = useThemes();
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(generatePath(ROUTE_PATH.THEMES, { id: String(id) }));
  };

  if (error) return null;
  if (loading) return <Loading />;
  return (
    <Container>
      {themes.map(theme => (
        <Theme key={theme.themeId} onClick={() => handleClick(theme.themeId)}>
          <Image alt={theme.name} src={theme.image} />
          <Text>{theme.name}</Text>
        </Theme>
      ))}
    </Container>
  );
};

export default ThemeList;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing4};
  padding: ${({ theme }) => theme.spacing.spacing4};
`;

const Theme = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.spacing2};
  cursor: pointer;
`;

const Image = styled.img`
  max-width: 3.125rem;
  max-height: 3.125rem;
  width: 100%;
  border-radius: 18px;
  object-fit: cover;
  overflow: hidden;
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  margin: 0px;
  text-align: left;
`;
