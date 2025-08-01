import "reflect-metadata";

import { Fragment } from "react";
import { createRoot } from "react-dom/client";

import { GlobalStyles } from "@/app/styles";

import App from "@/App";

async function enableMocking() {
    if (import.meta.env.PROD) return;

    const { worker } = await import("@/__mocks__/browser");

    return worker.start({
        onUnhandledRequest: "bypass",
    });
}

enableMocking().then(() => {
    createRoot(document.getElementById("root")!).render(
        <Fragment>
            <GlobalStyles />
            <App />
        </Fragment>,
    );
});
