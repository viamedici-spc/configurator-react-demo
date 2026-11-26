import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    root: "src",
    base: "",
    server: {port: 3000},
    build: {outDir: "../dist", emptyOutDir: true},
    plugins: [react()],
});
