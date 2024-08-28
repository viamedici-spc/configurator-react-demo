import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

export default defineConfig(({command, mode}) => ({
    root: "src",
    server: {
        port: 3000
    },
    build: {
        outDir: "../dist",
        emptyOutDir: true
    },
    base: "",
    plugins: [
        checker({typescript: true}),
        (mode === "hot" ? react({
            babel: {
                plugins: [
                    ["babel-plugin-styled-components", {ssr: false, displayName: true}]
                ]
            }
        }) : undefined)
    ]
}));
