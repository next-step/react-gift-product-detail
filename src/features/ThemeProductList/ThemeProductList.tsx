import { useParams } from 'react-router-dom';
import ProductList from './components/ProductList';
import ThemeHero from './components/ThemeHero';

const ThemeProductList = () => {
  const { id } = useParams();

  //id값이 없을 시 Not - Fount 페이지로 연결되기 때문에 실제로는 작동하지 않는 로직, 타입 에러 때문에 사용
  if (!id) return <div>유효한 테마 ID를 찾을 수 없습니다.</div>;

  return (
    <>
      <ThemeHero id={id} />
      <ProductList id={id} />
    </>
  );
};

export default ThemeProductList;
