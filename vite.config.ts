import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc'
import { createHtmlPlugin } from 'vite-plugin-html'

export default ({ mode }) => {
  let devEnv = '';
  const env = Object.assign(globalThis.process.env, loadEnv(mode, globalThis.process.cwd()));

  if (mode === 'development') {
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
    base: '',
    build: {
      outDir: 'build',
    },
    plugins: [
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            devEnv,
          },
        },
      }),
    ],
  });
}

