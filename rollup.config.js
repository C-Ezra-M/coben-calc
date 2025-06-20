import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-css-only';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import { fileURLToPath } from 'node:url';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

const tocExternalId = fileURLToPath(
    new URL(
        'src/toc.ts',
        import.meta.url
    )
);

export default {
    input: 'src/main.js',
    external: [tocExternalId],
    output: {
        file: 'public/bundle.js',
        //dir: 'public',
        format: 'iife', // immediately-invoked function expression — suitable for <script> tags
        sourcemap: true,
        name: 'cobenCalc',
        globals: {
            [tocExternalId]: 'addToc'
        }
    },
    plugins: [
        resolve(), // tells Rollup how to find date-fns in node_modules
        commonjs(), // converts date-fns to ES modules
        production && terser(), // minify, but only in production
        json(),
        css({
            output: 'bundle.css'
        }),
        //typescript(//{ allowJs: true })
        //)
    ]
};
