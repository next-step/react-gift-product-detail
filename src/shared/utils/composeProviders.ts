import React, { type PropsWithChildren } from "react";

export const composeProviders = (
    providers: React.ReactElement<PropsWithChildren>[],
    children: React.ReactNode,
) => {
    return providers.reduceRight(
        (acc, provider) => React.cloneElement(provider, { children: acc }),
        children,
    );
};
