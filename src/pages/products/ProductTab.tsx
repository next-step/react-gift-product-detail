import { PRODUCT_TABS, useProductTabContext } from "@/features/product/contexts/ProductTabContext";

import * as Styles from "./ProductTab.styled";

export const ProductTab = () => {
    const { switchTab, productTab } = useProductTabContext();

    return (
        <Styles.TabContainer>
            {PRODUCT_TABS.map((tab) => {
                return (
                    <Styles.TabItem active={tab === productTab} onClick={() => switchTab(tab)}>
                        {tab}
                    </Styles.TabItem>
                );
            })}
        </Styles.TabContainer>
    );
};
