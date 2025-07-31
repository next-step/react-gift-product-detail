import { useParams } from "react-router-dom";

import { useGetGiftThemeInfo } from "@/entities/gift/services/getGiftThemeInfo";

import { HTTPBoundary } from "@/shared/helpers/HTTPBoundary";

import { VerticalSpacing } from "@/widgets/layouts/Spacing.styled";

import * as Styles from "./ThemeInfoBanner.styled";

const ThemeInfoBannerContent = () => {
    const { id } = useParams();
    const { data } = useGetGiftThemeInfo(Number(id));

    return (
        <Styles.Container backgroundColor={data.backgroundColor}>
            <Styles.ThemeName>{data.name}</Styles.ThemeName>
            <VerticalSpacing size="8px" />
            <Styles.ThemeTitle>{data.title}</Styles.ThemeTitle>
            <Styles.ThemeDescription>{data.description}</Styles.ThemeDescription>
        </Styles.Container>
    );
};

export const ThemeInfoBanner = () => {
    return (
        <HTTPBoundary
            onPending={<VerticalSpacing size="128px" />}
            onError={() => <VerticalSpacing size="128px" />}
        >
            <ThemeInfoBannerContent />
        </HTTPBoundary>
    );
};
