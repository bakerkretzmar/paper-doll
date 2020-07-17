import fs from 'fs';
import { terser } from 'rollup-plugin-terser';
import html from '@rollup/plugin-html';

export default [
    {
        input: 'index.js',
        output: {
            file: 'dist/index.js',
            format: 'iife',
        },
        plugins: [
            terser(),
            html({
                template: ({ bundle, files }) => {
                    // prettier-ignore
                    return fs.readFileSync('./index.html').toString()
                        .replace('/* {{ css }} */', fs.readFileSync('./dist/index.css'))
                        .replace('// {{ js }}', Object.values(bundle)[0].code);
                },
            }),
        ],
    },
];
