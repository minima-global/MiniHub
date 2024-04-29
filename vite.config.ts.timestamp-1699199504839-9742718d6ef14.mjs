// vite.config.ts
import { defineConfig, loadEnv } from "file:///Users/eliasnemr/projects/v3/MiniHub/node_modules/vite/dist/node/index.js";
import react from "file:///Users/eliasnemr/projects/v3/MiniHub/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { createHtmlPlugin } from "file:///Users/eliasnemr/projects/v3/MiniHub/node_modules/vite-plugin-html/dist/index.mjs";
import legacy from "file:///Users/eliasnemr/projects/v3/MiniHub/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import { nodePolyfills } from "file:///Users/eliasnemr/projects/v3/MiniHub/node_modules/vite-plugin-node-polyfills/dist/index.js";
var vite_config_default = ({ mode }) => {
  let devEnv = "";
  const env = Object.assign(globalThis.process.env, loadEnv(mode, globalThis.process.cwd()));
  if (mode === "development") {
    devEnv = `
      <script>
        var DEBUG = "${env.VITE_DEBUG}" === 'true';
        var DEBUG_HOST = "${env.VITE_DEBUG_HOST}";
        var DEBUG_PORT = "${env.VITE_DEBUG_MDS_PORT}";
        var DEBUG_UID = "${env.VITE_DEBUG_UID}";
      </script>
    `;
  }
  return defineConfig({
    base: "",
    build: {
      outDir: "build"
    },
    plugins: [
      react(),
      legacy({
        targets: ["defaults", "not IE 11", "Android >= 9"]
      }),
      createHtmlPlugin({
        inject: {
          data: {
            devEnv
          }
        }
      }),
      nodePolyfills({
        // To add only specific polyfills, add them here. If no option is passed, adds all polyfills
        include: ["path"],
        // To exclude specific polyfills, add them to this list. Note: if include is provided, this has no effect
        exclude: [
          "http"
          // Excludes the polyfill for `http` and `node:http`.
        ],
        // Whether to polyfill specific globals.
        globals: {
          Buffer: true,
          // can also be 'build', 'dev', or false
          global: true,
          process: true
        },
        // Override the default polyfills for specific modules.
        overrides: {
          // Since `fs` is not supported in browsers, we can use the `memfs` package to polyfill it.
          fs: "memfs"
        },
        // Whether to polyfill `node:` protocol imports.
        protocolImports: true
      })
    ]
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZWxpYXNuZW1yL3Byb2plY3RzL3YzL01pbmlIdWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9lbGlhc25lbXIvcHJvamVjdHMvdjMvTWluaUh1Yi92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZWxpYXNuZW1yL3Byb2plY3RzL3YzL01pbmlIdWIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWh0bWwnO1xuaW1wb3J0IGxlZ2FjeSBmcm9tICdAdml0ZWpzL3BsdWdpbi1sZWdhY3knO1xuXG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSAndml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMnO1xuXG5leHBvcnQgZGVmYXVsdCAoeyBtb2RlIH0pID0+IHtcbiAgbGV0IGRldkVudiA9ICcnO1xuICBjb25zdCBlbnYgPSBPYmplY3QuYXNzaWduKGdsb2JhbFRoaXMucHJvY2Vzcy5lbnYsIGxvYWRFbnYobW9kZSwgZ2xvYmFsVGhpcy5wcm9jZXNzLmN3ZCgpKSk7XG5cbiAgaWYgKG1vZGUgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICBkZXZFbnYgPSBgXG4gICAgICA8c2NyaXB0PlxuICAgICAgICB2YXIgREVCVUcgPSBcIiR7ZW52LlZJVEVfREVCVUd9XCIgPT09ICd0cnVlJztcbiAgICAgICAgdmFyIERFQlVHX0hPU1QgPSBcIiR7ZW52LlZJVEVfREVCVUdfSE9TVH1cIjtcbiAgICAgICAgdmFyIERFQlVHX1BPUlQgPSBcIiR7ZW52LlZJVEVfREVCVUdfTURTX1BPUlR9XCI7XG4gICAgICAgIHZhciBERUJVR19VSUQgPSBcIiR7ZW52LlZJVEVfREVCVUdfVUlEfVwiO1xuICAgICAgPC9zY3JpcHQ+XG4gICAgYDtcbiAgfVxuXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xuICAgIGJhc2U6ICcnLFxuICAgIGJ1aWxkOiB7XG4gICAgICBvdXREaXI6ICdidWlsZCcsXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICByZWFjdCgpLFxuICAgICAgbGVnYWN5KHtcbiAgICAgICAgdGFyZ2V0czogWydkZWZhdWx0cycsICdub3QgSUUgMTEnLCAnQW5kcm9pZCA+PSA5J10sXG4gICAgICB9KSxcbiAgICAgIGNyZWF0ZUh0bWxQbHVnaW4oe1xuICAgICAgICBpbmplY3Q6IHtcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBkZXZFbnYsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgbm9kZVBvbHlmaWxscyh7XG4gICAgICAgIC8vIFRvIGFkZCBvbmx5IHNwZWNpZmljIHBvbHlmaWxscywgYWRkIHRoZW0gaGVyZS4gSWYgbm8gb3B0aW9uIGlzIHBhc3NlZCwgYWRkcyBhbGwgcG9seWZpbGxzXG4gICAgICAgIGluY2x1ZGU6IFsncGF0aCddLFxuICAgICAgICAvLyBUbyBleGNsdWRlIHNwZWNpZmljIHBvbHlmaWxscywgYWRkIHRoZW0gdG8gdGhpcyBsaXN0LiBOb3RlOiBpZiBpbmNsdWRlIGlzIHByb3ZpZGVkLCB0aGlzIGhhcyBubyBlZmZlY3RcbiAgICAgICAgZXhjbHVkZTogW1xuICAgICAgICAgICdodHRwJywgLy8gRXhjbHVkZXMgdGhlIHBvbHlmaWxsIGZvciBgaHR0cGAgYW5kIGBub2RlOmh0dHBgLlxuICAgICAgICBdLFxuICAgICAgICAvLyBXaGV0aGVyIHRvIHBvbHlmaWxsIHNwZWNpZmljIGdsb2JhbHMuXG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICBCdWZmZXI6IHRydWUsIC8vIGNhbiBhbHNvIGJlICdidWlsZCcsICdkZXYnLCBvciBmYWxzZVxuICAgICAgICAgIGdsb2JhbDogdHJ1ZSxcbiAgICAgICAgICBwcm9jZXNzOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICAvLyBPdmVycmlkZSB0aGUgZGVmYXVsdCBwb2x5ZmlsbHMgZm9yIHNwZWNpZmljIG1vZHVsZXMuXG4gICAgICAgIG92ZXJyaWRlczoge1xuICAgICAgICAgIC8vIFNpbmNlIGBmc2AgaXMgbm90IHN1cHBvcnRlZCBpbiBicm93c2Vycywgd2UgY2FuIHVzZSB0aGUgYG1lbWZzYCBwYWNrYWdlIHRvIHBvbHlmaWxsIGl0LlxuICAgICAgICAgIGZzOiAnbWVtZnMnLFxuICAgICAgICB9LFxuICAgICAgICAvLyBXaGV0aGVyIHRvIHBvbHlmaWxsIGBub2RlOmAgcHJvdG9jb2wgaW1wb3J0cy5cbiAgICAgICAgcHJvdG9jb2xJbXBvcnRzOiB0cnVlLFxuICAgICAgfSksXG4gICAgXSxcbiAgfSk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4UixTQUFTLGNBQWMsZUFBZTtBQUNwVSxPQUFPLFdBQVc7QUFDbEIsU0FBUyx3QkFBd0I7QUFDakMsT0FBTyxZQUFZO0FBRW5CLFNBQVMscUJBQXFCO0FBRTlCLElBQU8sc0JBQVEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUMzQixNQUFJLFNBQVM7QUFDYixRQUFNLE1BQU0sT0FBTyxPQUFPLFdBQVcsUUFBUSxLQUFLLFFBQVEsTUFBTSxXQUFXLFFBQVEsSUFBSSxDQUFDLENBQUM7QUFFekYsTUFBSSxTQUFTLGVBQWU7QUFDMUIsYUFBUztBQUFBO0FBQUEsdUJBRVUsSUFBSTtBQUFBLDRCQUNDLElBQUk7QUFBQSw0QkFDSixJQUFJO0FBQUEsMkJBQ0wsSUFBSTtBQUFBO0FBQUE7QUFBQSxFQUc3QjtBQUVBLFNBQU8sYUFBYTtBQUFBLElBQ2xCLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxJQUNWO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxTQUFTLENBQUMsWUFBWSxhQUFhLGNBQWM7QUFBQSxNQUNuRCxDQUFDO0FBQUEsTUFDRCxpQkFBaUI7QUFBQSxRQUNmLFFBQVE7QUFBQSxVQUNOLE1BQU07QUFBQSxZQUNKO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxNQUNELGNBQWM7QUFBQTtBQUFBLFFBRVosU0FBUyxDQUFDLE1BQU07QUFBQTtBQUFBLFFBRWhCLFNBQVM7QUFBQSxVQUNQO0FBQUE7QUFBQSxRQUNGO0FBQUE7QUFBQSxRQUVBLFNBQVM7QUFBQSxVQUNQLFFBQVE7QUFBQTtBQUFBLFVBQ1IsUUFBUTtBQUFBLFVBQ1IsU0FBUztBQUFBLFFBQ1g7QUFBQTtBQUFBLFFBRUEsV0FBVztBQUFBO0FBQUEsVUFFVCxJQUFJO0FBQUEsUUFDTjtBQUFBO0FBQUEsUUFFQSxpQkFBaUI7QUFBQSxNQUNuQixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
