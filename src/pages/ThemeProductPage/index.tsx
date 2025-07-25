/** @jsxImportSource @emotion/react */
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ThemeHero from './ThemeHero';
import ThemeProductList from './ThemeProductList';
import { useThemeInfo } from '../../apis/info';
import axios from 'axios';

const ThemeProductPage = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();

  const { data: themeInfo, isPending, error } = useThemeInfo(themeId || '');

  useEffect(() => {
    if (!themeId) {
      navigate('/');
    }
  }, [themeId, navigate]);

  useEffect(() => {
    if (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        navigate('/');
      } else {
        console.error('테마 정보 조회 실패:', error);
        navigate('/');
      }
    }
  }, [error, navigate]);

  if (isPending) return <div>로딩 중...</div>;
  if (!themeInfo) return null;

  return (
    <main>
      <ThemeHero
        name={themeInfo.name}
        title={themeInfo.title}
        description={themeInfo.description}
        backgroundColor={themeInfo.backgroundColor}
      />
      <ThemeProductList />
    </main>
  );
};

export default ThemeProductPage;
