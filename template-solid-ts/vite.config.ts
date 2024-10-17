import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import solidPlugin from "vite-plugin-solid";
import suidPlugin from "@suid/vite-plugin";

export default defineConfig({
  plugins: [solid(), solidPlugin(), suidPlugin()],
  build: {
    target: "esnext",
  },
})
