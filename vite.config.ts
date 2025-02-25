import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { createHtmlPlugin } from 'vite-plugin-html';
import legacy from '@vitejs/plugin-legacy';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { copyFileSync } from 'fs';

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
      legacy({
        targets: ['defaults', 'not IE 11', 'Android >= 9'],
      }),
      createHtmlPlugin({
        inject: {
          data: {
            devEnv,
          },
        },
      }),
      nodePolyfills({
        // To add only specific polyfills, add them here. If no option is passed, adds all polyfills
        include: ['path'],
        // To exclude specific polyfills, add them to this list. Note: if include is provided, this has no effect
        exclude: [
          'http', // Excludes the polyfill for `http` and `node:http`.
        ],
        // Whether to polyfill specific globals.
        globals: {
          Buffer: true, // can also be 'build', 'dev', or false
          global: true,
          process: true,
        },
        // Override the default polyfills for specific modules.
        overrides: {
          // Since `fs` is not supported in browsers, we can use the `memfs` package to polyfill it.
          fs: 'memfs',
        },
        // Whether to polyfill `node:` protocol imports.
        protocolImports: true,
      }),
      {
        name: 'copy-changelog',
        closeBundle() {
          try {
            copyFileSync('CHANGELOG.md', 'build/CHANGELOG.md');
          } catch (error) {
            console.warn('Could not copy CHANGELOG.md, please check that it exists in the root directory');
          }
        }
      }
    ],
  });
};
