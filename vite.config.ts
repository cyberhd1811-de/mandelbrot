import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [
        solidPlugin(),
    ],
    server: {
        port: 3000,
    },
    build: {
        target: 'esnext',
        rollupOptions: {
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].[ext]',
                assetFileNames: 'assets/[name].[ext]',
            },
        },
    },
});
