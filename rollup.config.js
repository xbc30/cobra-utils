// 为了让rollup识别commonjs类型的包,默认只支持导入ES6
import commonjs from '@rollup/plugin-commonjs';
// 为了支持import xx from 'xxx'
import nodeResolve from '@rollup/plugin-node-resolve';
// ts转js的编译器
import typescript from 'rollup-plugin-ts';
// 支持加载json文件
import json from '@rollup/plugin-json';
// 支持字符串替换, 比如动态读取package.json的version到代码
import replace from '@rollup/plugin-replace';
// 代码生成sourcemaps
import sourceMaps from 'rollup-plugin-sourcemaps'
// 支持多文件打包入口
import multi from '@rollup/plugin-multi-entry';
// .d.ts
import dts from "rollup-plugin-dts";

// 读取package.json
import pkg from './package.json';

// 代码头
const banner =
    `/*!
 * cobra-utils v${pkg.version}
 * (c) 2019-${new Date().getFullYear()}
 * https://github.com/xbc30/cobra-utils
 * Released under the MIT License.
 */`

export default {
    input: './src/**/*.ts',
    plugins: [
        // 代码中的__VERSION__字符串会被package.json中的version字段所替代
        replace({
            __VERSION__: pkg.version
        }),

        typescript({
            exclude: 'node_modules/**',
            typescript: require('typescript'),
        }),
        json(),
        nodeResolve({
            jsnext: true,
            main: true
        }),
        commonjs({
            include: 'node_modules/**'
        }),
        dts(),
        multi(),

        sourceMaps()
    ],
    output: [{
            format: 'cjs',
            // 生成的文件名和路径
            file: './lib/index.cjs.js',
            banner,
            sourcemap: true
        },
        {
            format: 'es',
            file: './lib/index.es.js',
            banner,
            sourcemap: true
        },
        {
            format: 'umd',
            name: 'corbra-utils',
            file: './lib/index.umd.js',
            banner,
            sourcemap: true
        }
    ],
};