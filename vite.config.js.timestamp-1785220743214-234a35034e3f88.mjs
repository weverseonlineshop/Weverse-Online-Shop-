// vite.config.js
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import tailwindcss from "file:///home/project/node_modules/@tailwindcss/vite/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: true,
    port: 5173
  },
  build: {
    target: "esnext",
    rollupOptions: {
      external: [
        "@capacitor/core",
        "@capacitor/app",
        "@capacitor/browser",
        "@capacitor/camera",
        "@capacitor/filesystem",
        "@capacitor/haptics",
        "@capacitor/network",
        "@capacitor/preferences",
        "@capacitor/push-notifications",
        "@capacitor/splash-screen",
        "@capacitor/status-bar"
      ],
      input: {
        main: resolve(__vite_injected_original_dirname, "index.html"),
        details: resolve(__vite_injected_original_dirname, "details.html"),
        auth: resolve(__vite_injected_original_dirname, "auth.html"),
        payment: resolve(__vite_injected_original_dirname, "payment.html"),
        account: resolve(__vite_injected_original_dirname, "account.html"),
        checkout: resolve(__vite_injected_original_dirname, "checkout.html"),
        adminShipping: resolve(__vite_injected_original_dirname, "admin-shipping.html"),
        about: resolve(__vite_injected_original_dirname, "about.html"),
        contact: resolve(__vite_injected_original_dirname, "contact.html"),
        privacy: resolve(__vite_injected_original_dirname, "privacy.html"),
        terms: resolve(__vite_injected_original_dirname, "terms.html"),
        refundPolicy: resolve(__vite_injected_original_dirname, "refund-policy.html"),
        shippingPolicy: resolve(__vite_injected_original_dirname, "shipping-policy.html"),
        help: resolve(__vite_injected_original_dirname, "help.html"),
        adminAi: resolve(__vite_injected_original_dirname, "admin-ai.html"),
        adminAiSettings: resolve(__vite_injected_original_dirname, "admin-ai-settings.html"),
        admin: resolve(__vite_injected_original_dirname, "admin.html")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICdAdGFpbHdpbmRjc3Mvdml0ZSc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFt0YWlsd2luZGNzcygpXSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogdHJ1ZSxcbiAgICBwb3J0OiA1MTczLFxuICB9LFxuICBidWlsZDoge1xuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcbiAgICAgICAgJ0BjYXBhY2l0b3IvY29yZScsXG4gICAgICAgICdAY2FwYWNpdG9yL2FwcCcsXG4gICAgICAgICdAY2FwYWNpdG9yL2Jyb3dzZXInLFxuICAgICAgICAnQGNhcGFjaXRvci9jYW1lcmEnLFxuICAgICAgICAnQGNhcGFjaXRvci9maWxlc3lzdGVtJyxcbiAgICAgICAgJ0BjYXBhY2l0b3IvaGFwdGljcycsXG4gICAgICAgICdAY2FwYWNpdG9yL25ldHdvcmsnLFxuICAgICAgICAnQGNhcGFjaXRvci9wcmVmZXJlbmNlcycsXG4gICAgICAgICdAY2FwYWNpdG9yL3B1c2gtbm90aWZpY2F0aW9ucycsXG4gICAgICAgICdAY2FwYWNpdG9yL3NwbGFzaC1zY3JlZW4nLFxuICAgICAgICAnQGNhcGFjaXRvci9zdGF0dXMtYmFyJyxcbiAgICAgIF0sXG4gICAgICBpbnB1dDoge1xuICAgICAgICBtYWluOiByZXNvbHZlKF9fZGlybmFtZSwgJ2luZGV4Lmh0bWwnKSxcbiAgICAgICAgZGV0YWlsczogcmVzb2x2ZShfX2Rpcm5hbWUsICdkZXRhaWxzLmh0bWwnKSxcbiAgICAgICAgYXV0aDogcmVzb2x2ZShfX2Rpcm5hbWUsICdhdXRoLmh0bWwnKSxcbiAgICAgICAgcGF5bWVudDogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYXltZW50Lmh0bWwnKSxcbiAgICAgICAgYWNjb3VudDogcmVzb2x2ZShfX2Rpcm5hbWUsICdhY2NvdW50Lmh0bWwnKSxcbiAgICAgICAgY2hlY2tvdXQ6IHJlc29sdmUoX19kaXJuYW1lLCAnY2hlY2tvdXQuaHRtbCcpLFxuICAgICAgICBhZG1pblNoaXBwaW5nOiByZXNvbHZlKF9fZGlybmFtZSwgJ2FkbWluLXNoaXBwaW5nLmh0bWwnKSxcbiAgICAgICAgYWJvdXQ6IHJlc29sdmUoX19kaXJuYW1lLCAnYWJvdXQuaHRtbCcpLFxuICAgICAgICBjb250YWN0OiByZXNvbHZlKF9fZGlybmFtZSwgJ2NvbnRhY3QuaHRtbCcpLFxuICAgICAgICBwcml2YWN5OiByZXNvbHZlKF9fZGlybmFtZSwgJ3ByaXZhY3kuaHRtbCcpLFxuICAgICAgICB0ZXJtczogcmVzb2x2ZShfX2Rpcm5hbWUsICd0ZXJtcy5odG1sJyksXG4gICAgICAgIHJlZnVuZFBvbGljeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdyZWZ1bmQtcG9saWN5Lmh0bWwnKSxcbiAgICAgICAgc2hpcHBpbmdQb2xpY3k6IHJlc29sdmUoX19kaXJuYW1lLCAnc2hpcHBpbmctcG9saWN5Lmh0bWwnKSxcbiAgICAgICAgaGVscDogcmVzb2x2ZShfX2Rpcm5hbWUsICdoZWxwLmh0bWwnKSxcbiAgICAgICAgYWRtaW5BaTogcmVzb2x2ZShfX2Rpcm5hbWUsICdhZG1pbi1haS5odG1sJyksXG4gICAgICAgIGFkbWluQWlTZXR0aW5nczogcmVzb2x2ZShfX2Rpcm5hbWUsICdhZG1pbi1haS1zZXR0aW5ncy5odG1sJyksXG4gICAgICAgIGFkbWluOiByZXNvbHZlKF9fZGlybmFtZSwgJ2FkbWluLmh0bWwnKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLGlCQUFpQjtBQUN4QixTQUFTLGVBQWU7QUFGeEIsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLFlBQVksQ0FBQztBQUFBLEVBQ3ZCLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxPQUFPO0FBQUEsUUFDTCxNQUFNLFFBQVEsa0NBQVcsWUFBWTtBQUFBLFFBQ3JDLFNBQVMsUUFBUSxrQ0FBVyxjQUFjO0FBQUEsUUFDMUMsTUFBTSxRQUFRLGtDQUFXLFdBQVc7QUFBQSxRQUNwQyxTQUFTLFFBQVEsa0NBQVcsY0FBYztBQUFBLFFBQzFDLFNBQVMsUUFBUSxrQ0FBVyxjQUFjO0FBQUEsUUFDMUMsVUFBVSxRQUFRLGtDQUFXLGVBQWU7QUFBQSxRQUM1QyxlQUFlLFFBQVEsa0NBQVcscUJBQXFCO0FBQUEsUUFDdkQsT0FBTyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxRQUN0QyxTQUFTLFFBQVEsa0NBQVcsY0FBYztBQUFBLFFBQzFDLFNBQVMsUUFBUSxrQ0FBVyxjQUFjO0FBQUEsUUFDMUMsT0FBTyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxRQUN0QyxjQUFjLFFBQVEsa0NBQVcsb0JBQW9CO0FBQUEsUUFDckQsZ0JBQWdCLFFBQVEsa0NBQVcsc0JBQXNCO0FBQUEsUUFDekQsTUFBTSxRQUFRLGtDQUFXLFdBQVc7QUFBQSxRQUNwQyxTQUFTLFFBQVEsa0NBQVcsZUFBZTtBQUFBLFFBQzNDLGlCQUFpQixRQUFRLGtDQUFXLHdCQUF3QjtBQUFBLFFBQzVELE9BQU8sUUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDeEM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
