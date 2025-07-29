import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { toast } from 'react-toastify';
import { AuthContext } from "@/context/AuthContext";
import { templates } from "@/resources/mock/templates";
const MAX_RECEIVERS = 10;
const DEFAULT_RECEIVER = { name: "", phone: "", quantity: 1 };
// OrderPage 컴포넌트
export default function OrderPage() {
    const params = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user, token } = useContext(AuthContext);
    const userName = user?.name || "";
    // 로그인 체크
    useEffect(() => {
        if (!token) {
            const redirectTo = `${location.pathname}${location.search}`;
            navigate(`/login?redirect=${encodeURIComponent(redirectTo)}`, { replace: true });
        }
    }, [token, navigate]);
    if (!token || !user)
        return null;
    // React Hook Form 설정 (sender 기본값에 user.name 사용)
    const { control, register, handleSubmit, watch, formState: { errors }, trigger, } = useForm({
        defaultValues: { sender: userName, receivers: [DEFAULT_RECEIVER] },
        mode: "onChange",
    });
    const receivers = watch("receivers");
    const { fields, append, remove } = useFieldArray({ control, name: "receivers" });
    // 템플릿 상태
    const initialTemplateId = Number(searchParams.get("template")) || templates[0].id;
    const [selectedTemplateId, setSelectedTemplateId] = useState(initialTemplateId);
    const selectedTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];
    const [messageText, setMessageText] = useState(selectedTemplate.defaultTextMessage);
    useEffect(() => {
        setMessageText(selectedTemplate.defaultTextMessage);
    }, [selectedTemplateId]);
    // 상품 조회
    const idParam = params.id;
    const productId = Number(idParam);
    const [productSummary, setProductSummary] = useState(null);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [errorProduct, setErrorProduct] = useState(false);
    useEffect(() => {
        setLoadingProduct(true);
        setErrorProduct(false);
        axios
            .get(`http://127.0.0.1:3000/api/products/${productId}/summary`)
            .then((res) => {
            setProductSummary(res.data.data);
            setLoadingProduct(false);
        })
            .catch((err) => {
            console.error("상품 조회 실패:", err);
            setErrorProduct(true);
            setLoadingProduct(false);
            const errorMessage = (err.response &&
                typeof err.response.data === "object" &&
                err.response.data &&
                "data" in err.response.data &&
                typeof err.response.data.data === "object" &&
                err.response.data.data &&
                "message" in err.response.data.data)
                ? err.response.data.data.message
                : "제품 정보를 불러오지 못했습니다.";
            toast.error(errorMessage);
            navigate("/", { replace: true });
        });
    }, [productId]);
    if (loadingProduct) {
        return _jsx("div", { children: "\uC0C1\uD488 \uC815\uBCF4\uB97C \uB85C\uB529 \uC911\u2026" });
    }
    if (errorProduct || !productSummary) {
        return _jsxs("div", { children: ["\uC0C1\uD488 \uC815\uBCF4\uB97C \uAC00\uC838\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. (ID: ", productId, ")"] });
    }
    // OrderPage.tsx (onSubmit 부분)
    const onSubmit = async (data) => {
        try {
            await axios.post("http://127.0.0.1:3000/api/order", // 1) URL 수정
            {
                productId: Number(params.id), // 2) URL 파라미터나 state에서 가져오기
                message: messageText,
                messageCardId: String(selectedTemplateId), // 3) templateId → messageCardId
                ordererName: data.sender, // 4) sender → ordererName
                receivers: data.receivers.map(r => ({
                    name: r.name,
                    phoneNumber: r.phone,
                    quantity: r.quantity,
                })),
            }, {
                headers: {
                    Authorization: token,
                },
            });
            alert("주문이 완료되었습니다!");
            navigate("/", { replace: true });
        }
        catch (err) {
            const status = err.response?.status;
            if (status === 401) {
                // 현재 URL 을 redirect 파라미터로 넘기기
                const redirectTo = location.pathname + location.search;
                navigate(`/login?redirect=${encodeURIComponent(redirectTo)}`, { replace: true });
                return;
            }
            // 그 외 에러는 기존처럼 alert
            console.error("주문 에러 응답:", err.response?.data);
            alert(err.response?.data?.message ||
                `서버 에러: ${status}`);
        }
    };
    // 스타일 (간단하게 인라인 유지)
    const templateListStyle = {
        display: "flex",
        overflowX: "auto",
        gap: 8,
        padding: "8px 0",
    };
    return (_jsxs("div", { style: { padding: 20 }, children: [_jsx("div", { style: templateListStyle, children: templates.map((t) => (_jsx("img", { src: t.thumbUrl, alt: t.defaultTextMessage, onClick: () => setSelectedTemplateId(t.id), style: {
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        cursor: "pointer",
                        border: selectedTemplateId === t.id ? "2px solid #467DE9" : "2px solid transparent",
                        borderRadius: 4,
                    } }, t.id))) }), _jsx("img", { src: selectedTemplate.imageUrl, alt: "\uC120\uD0DD\uB41C \uD15C\uD50C\uB9BF \uBA54\uC2DC\uC9C0 \uCE74\uB4DC \uBBF8\uB9AC\uBCF4\uAE30", style: { width: "100%", borderRadius: 8, marginBottom: 16 } }), _jsx("label", { style: { display: "block", marginBottom: 8 }, children: "\uBA54\uC2DC\uC9C0 \uB0B4\uC6A9:" }), _jsx("textarea", { value: messageText, onChange: (e) => setMessageText(e.target.value), rows: 3, style: { width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 4 } }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), style: { marginTop: 24 }, children: [_jsxs("div", { style: { marginBottom: 16 }, children: [_jsx("label", { children: "\uBCF4\uB0B4\uB294 \uC0AC\uB78C" }), _jsx("input", { ...register("sender", { required: "보내는 사람 이름을 입력하세요." }), defaultValue: userName, className: "w-full p-2 border rounded" }), errors.sender && _jsx("p", { className: "text-red-500 text-sm", children: errors.sender.message })] }), _jsx("h2", { children: "\uBC1B\uB294 \uC0AC\uB78C" }), _jsxs("p", { children: ["* \uCD5C\uB300 ", MAX_RECEIVERS, "\uBA85\uAE4C\uC9C0 \uCD94\uAC00\uD560 \uC218 \uC788\uC5B4\uC694."] }), _jsx("p", { children: "* \uC804\uD654\uBC88\uD638 \uC911\uBCF5 \uC785\uB825 \uBD88\uAC00." }), _jsx("button", { type: "button", onClick: () => {
                            if (fields.length < MAX_RECEIVERS)
                                append(DEFAULT_RECEIVER);
                            trigger();
                        }, style: {
                            marginBottom: 16,
                            padding: "4px 12px",
                            backgroundColor: "#f3f4f6",
                            borderRadius: 4,
                            border: "none",
                            cursor: "pointer",
                        }, children: "\uCD94\uAC00\uD558\uAE30" }), fields.map((field, idx) => (_jsxs("div", { style: { marginBottom: 16 }, children: [_jsxs("div", { style: { display: "flex", justifyContent: "space-between" }, children: [_jsxs("h3", { children: ["\uBC1B\uB294 \uC0AC\uB78C ", idx + 1] }), _jsx("button", { type: "button", onClick: () => remove(idx), className: "text-red-500", children: "\u2715" })] }), _jsxs("div", { className: "mb-2", children: [_jsx("label", { children: "\uC774\uB984" }), _jsx("input", { ...register(`receivers.${idx}.name`, { required: "이름을 입력하세요." }), className: "w-full p-2 border rounded" }), errors.receivers?.[idx]?.name && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.receivers[idx]?.name?.message }))] }), _jsxs("div", { className: "mb-2", children: [_jsx("label", { children: "\uC804\uD654\uBC88\uD638" }), _jsx("input", { ...register(`receivers.${idx}.phone`, {
                                            required: "전화번호를 입력하세요.",
                                            pattern: {
                                                value: /^010\d{8}$/,
                                                message: "01012345678 형식이어야 해요.",
                                            },
                                            validate: (val) => {
                                                const count = receivers.filter((r) => r.phone === val).length;
                                                return count === 1 || "중복된 전화번호가 있습니다.";
                                            },
                                        }), className: "w-full p-2 border rounded" }), errors.receivers?.[idx]?.phone && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.receivers[idx]?.phone?.message }))] }), _jsxs("div", { className: "mb-2", children: [_jsx("label", { children: "\uC218\uB7C9" }), _jsx("input", { type: "number", ...register(`receivers.${idx}.quantity`, {
                                            min: { value: 1, message: "1개 이상 입력하세요." },
                                        }), className: "w-full p-2 border rounded", min: 1 }), errors.receivers?.[idx]?.quantity && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.receivers[idx]?.quantity?.message }))] })] }, field.id))), _jsxs("button", { type: "submit", className: "px-4 py-2 bg-yellow-400 rounded w-full", children: [fields.length, "\uBA85 \uC644\uB8CC"] })] }), _jsxs("div", { style: { marginTop: 32 }, children: [_jsx("img", { src: productSummary.imageURL, alt: productSummary.name, style: { width: 80, borderRadius: 8 } }), _jsx("div", { children: productSummary.name }), _jsxs("p", { children: ["\u20A9", productSummary.price.sellingPrice?.toLocaleString()] })] })] }));
}
