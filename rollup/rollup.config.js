// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
/**
 *
 */
export default {
  input: ["src/index.js", "src/util.js"],
  output: [
    { dir: "dist/es", format: "esm" },
    { dir: "dist/cjs", format: "cjs" },
  ],

  // 通过 plugins 参数添加插件
  plugins: [resolve(), commonjs()],
};
