import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HorizontalSpacing } from '@/components/common/Spacing/HorizontalSpacing';
import { AdListSection } from './components/AdListSection';
import ProductRankingListSection from '@/pages/Home/components/ProductRankingListSection';
import { SelectFriendSection } from './components/SelectFriendSection';
import { SelectThemeSection } from './components/SelectThemeSection';
const HomePage = () => {
    return (_jsxs("main", { children: [_jsx(SelectFriendSection, {}), _jsx(HorizontalSpacing, { size: 'spacing6' }), _jsx(SelectThemeSection, {}), _jsx(HorizontalSpacing, { size: 'spacing6' }), _jsx(AdListSection, {}), _jsx(HorizontalSpacing, { size: 'spacing10' }), _jsx(ProductRankingListSection, {}), _jsx(HorizontalSpacing, { size: 'spacing10' })] }));
};
export default HomePage;
