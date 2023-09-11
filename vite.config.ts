import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        solidPlugin(),
        VitePWA({
            devOptions: {
                enabled: true,
            },
            injectRegister: 'auto',
            manifest: {
                background_color: '#0f0c0c',
                description: 'A simple viewer of the mandelbrot set.',
                display: 'standalone',
                icons: [
                    {
                        src: 'img/logo_512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                    {
                        src: 'img/logo_512_maskable.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                ],
                lang: 'en',
                name: 'Mandelbrot',
                short_name: 'Mandelbrot',
                start_url: '/*',
                theme_color: '#f0f5f0',
            },
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.[js,css,html,ico,svg,png]'],
            },
        }),
    ],
    server: {
        port: 3000,
    },
    build: {
        target: 'esnext',
    },
});
