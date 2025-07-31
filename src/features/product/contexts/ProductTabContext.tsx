import { createContext, useContext, useState, type PropsWithChildren } from "react";

export const PRODUCT_TABS = ["상품설명", "선물후기", "상세정보"] as const;

export interface ProductTabContextType {
    productTab: (typeof PRODUCT_TABS)[number];
    switchTab: (tab: (typeof PRODUCT_TABS)[number]) => void;
}

export const ProductTabContext = createContext<ProductTabContextType | null>(null);

export const ProductTabProvider = ({ children }: Partial<PropsWithChildren>) => {
    const [productTab, setProductTab] = useState<(typeof PRODUCT_TABS)[number]>("상품설명");

    const switchTab = (tab: (typeof PRODUCT_TABS)[number]) => {
        setProductTab(tab);
    };

    return (
        <ProductTabContext.Provider value={{ productTab, switchTab }}>
            {children}
        </ProductTabContext.Provider>
    );
};

export const useProductTabContext = () => {
    const context = useContext(ProductTabContext);
    if (!context) {
        throw new Error(
            "useProductTabContext 는 ProductTabProvider 내부에서만 사용할 수 있습니다.",
        );
    }
    return context;
};
