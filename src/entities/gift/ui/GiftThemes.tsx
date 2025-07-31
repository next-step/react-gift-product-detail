import { useNavigate } from "react-router-dom";

import { useGiftThemes } from "@/entities/gift/services/getGiftThemes";
import { GiftCategoryGrid, GiftCategoryItem } from "@/entities/gift/ui";

import { HTTPBoundary } from "@/shared/helpers/HTTPBoundary";
import { Spinner } from "@/shared/ui/Spinner";

const GiftThemesContent = () => {
    const navigate = useNavigate();
    const { data } = useGiftThemes();

    return (
        <GiftCategoryGrid>
            {data?.map((category) => {
                return (
                    <GiftCategoryItem
                        onClick={() => navigate(`/theme/${category.themeId}`)}
                        key={category.themeId}
                        imgSrc={category.image}
                        label={category.name}
                    />
                );
            })}
        </GiftCategoryGrid>
    );
};

export const GiftThemes = () => {
    return (
        <HTTPBoundary
            onPending={
                <GiftCategoryGrid>
                    <Spinner size="40px" borderWidth="4px" color="#000" />
                </GiftCategoryGrid>
            }
            onError={() => <GiftCategoryGrid>에러 발생</GiftCategoryGrid>}
        >
            <GiftThemesContent />
        </HTTPBoundary>
    );
};
