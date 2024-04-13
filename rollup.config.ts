import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { RollupOptions } from 'rollup';
import html from '@rollup/plugin-html';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import { template } from './main/main.template';
import { templateCreator } from './examples/examples.template';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
const serve = require('@rollup-extras/plugin-serve');
const clean = require('@rollup-extras/plugin-clean');

const examples = readdirSync(resolve('./examples'))
    .map(name => {
        const path = resolve(`./examples/${name}/index.ts`);
        if (!existsSync(path)) {
            return;
        }
        return {
            name: name,
            path: path,
        };
    })
    .filter(Boolean) as {
    name: string;
    path: string;
}[];

const examplesConfig = examples.map(it => {
    return {
        input: it.path,
        plugins: [
            nodeResolve(),
            commonjs(),
            html({
                title: `JavaScript Snippets -- ${it.name}`,
                template: templateCreator(readFileSync(it.path).toString('utf8')),
            }),
            typescript(),
            clean(),
        ],
        output: {
            file: `./dist/examples/${it.name}/index.js`,
            format: 'iife',
            name: 'main',
        },
    } as RollupOptions;
});

export default [
    {
        input: './main/index.tsx',
        plugins: [
            nodeResolve(),
            commonjs(),
            html({
                title: 'JavaScript Snippets',
                template: template,
            }),
            replace({
                'process.env.EXAMPLES': JSON.stringify(examples.map(it => it.name)),
                'process.env.NODE_ENV': process.env.NODE_ENV,
                preventAssignment: true,
            }),
            typescript(),
            serve({
                port: 9099,
                dirs: './dist',
            }),
            clean(),
        ],
        output: {
            file: './dist/main.js',
            format: 'iife',
        },
    },
    ...examplesConfig,
] as RollupOptions[];
