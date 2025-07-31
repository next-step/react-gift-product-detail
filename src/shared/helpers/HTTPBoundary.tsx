import { Suspense } from "react";

import { HTTPExceptionBoundary } from "@/shared/errors/HTTPExceptionBoundary";

export interface HTTPBoundaryProps {
    onPending?: React.ReactNode;
    onError?: (code?: number) => React.ReactNode;

    children?: React.ReactNode;
}

export const HTTPBoundary = ({ onPending, onError, children }: HTTPBoundaryProps) => {
    return (
        <HTTPExceptionBoundary onError={onError}>
            <Suspense fallback={onPending}>{children}</Suspense>
        </HTTPExceptionBoundary>
    );
};
