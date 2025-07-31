import ProductList from './components/ProductList';
import ThemeHero from './components/ThemeHero';
import useRequiredParam from '@hooks/useRequiredParam';

const ThemeProductList = () => {
  const id = useRequiredParam('id');

  return (
    <>
      <ThemeHero id={id} />
      <ProductList id={id} />
    </>
  );
};

export default ThemeProductList;
