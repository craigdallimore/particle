import typescript from "@rollup/plugin-typescript";
import serve from "rollup-plugin-serve";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";

export default {
  input: "src/main.ts",
  output: {
    compact: true,
    sourcemap: true,
    file: "static/bundle.js",
  },
  plugins: [
    typescript({ sourceMap: true, inlineSources: true }),
    serve("static"),
    commonjs(),
    resolve(),
    livereload(),
  ],
};
