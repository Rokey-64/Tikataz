import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // hoặc '0.0.0.0' nếu muốn truy cập qua IP LAN
    port: 49152,
    allowedHosts: ['accounts.tikataz.vn', 'accounts.tikataz.com'],
  },
});