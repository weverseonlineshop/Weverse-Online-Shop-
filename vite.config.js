import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      external: [
        '@capacitor/core',
        '@capacitor/app',
        '@capacitor/browser',
        '@capacitor/camera',
        '@capacitor/filesystem',
        '@capacitor/haptics',
        '@capacitor/network',
        '@capacitor/preferences',
        '@capacitor/push-notifications',
        '@capacitor/splash-screen',
        '@capacitor/status-bar',
      ],
      input: {
        main: resolve(__dirname, 'index.html'),
        details: resolve(__dirname, 'details.html'),
        auth: resolve(__dirname, 'auth.html'),
        payment: resolve(__dirname, 'payment.html'),
        account: resolve(__dirname, 'account.html'),
        checkout: resolve(__dirname, 'checkout.html'),
        adminShipping: resolve(__dirname, 'admin-shipping.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
        refundPolicy: resolve(__dirname, 'refund-policy.html'),
        shippingPolicy: resolve(__dirname, 'shipping-policy.html'),
        help: resolve(__dirname, 'help.html'),
        adminAi: resolve(__dirname, 'admin-ai.html'),
        adminAiSettings: resolve(__dirname, 'admin-ai-settings.html'),
        admin: resolve(__dirname, 'admin.html'),
      },
    },
  },
});
