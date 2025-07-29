import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from 'react-router-dom';
import { ThemeHero } from '@/pages/Home/components/SelectThemeSection/ThemeHero';
import { ProductList } from '@/pages/Home/components/SelectThemeSection/ProductList';
export default function ThemeProductsPage() {
    const { themeId } = useParams();
    const id = Number(themeId);
    return (_jsxs("main", { children: [_jsx(ThemeHero, { themeId: id }), _jsx(ProductList, { themeId: id })] }));
}
