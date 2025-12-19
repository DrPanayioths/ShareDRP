import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import os from "os";

// Lan Ip Getter
function localip() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    const ifaceList = interfaces[name];
    if (ifaceList) {
      for (const iface of ifaceList) {
        if (iface.family === "IPv4" && !iface.internal) {
          return iface.address;
        }
      }
    }
  }
  return "localhost";
}

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    host: true,
    port: 5173,
  },
  define: {
    __Network_IP__: JSON.stringify(`${localip()}`),
  },
});
