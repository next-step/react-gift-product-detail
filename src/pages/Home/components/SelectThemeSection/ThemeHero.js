import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
export function ThemeHero({ themeId }) {
    const navigate = useNavigate();
    const { data: info, loading, error } = useFetch({
        url: `/api/themes/${themeId}/info`,
        method: 'get',
    }, [themeId]);
    // 로딩
    if (loading)
        return _jsx("div", { children: "\uB85C\uB529 \uC911\u2026" });
    // 에러 처리: 404 시 홈으로 리다이렉트
    if (error) {
        if (error.response?.status === 404) {
            navigate('/', { replace: true });
            return null;
        }
        console.error('테마 상세 정보 로드 실패:', error);
        return _jsx("div", { children: "\uC815\uBCF4\uB97C \uBD88\uB7EC\uC624\uB294 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4." });
    }
    // 데이터 없으면 렌더링하지 않음
    if (!info)
        return null;
    const { title, description, backgroundColor } = info.data;
    return (_jsxs("section", { style: {
            backgroundColor,
            padding: '60px 20px',
            color: '#fff',
            textAlign: 'center',
            borderRadius: 8,
            marginBottom: 24,
        }, children: [_jsx("h1", { style: { fontSize: '2.5rem', margin: '0 0 16px' }, children: title }), _jsx("p", { style: { fontSize: '1.125rem', maxWidth: 600, margin: '0 auto' }, children: description })] }));
}
