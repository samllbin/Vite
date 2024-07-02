//首先是 rollup.rollup ，用来一次性地进行 Rollup 打包
const rollup = require("rollup");
// 常用 inputOptions 配置
const inputOptions = {
  input: "./src/index.js",
  external: [],
  plugins: [],
};
const outputOptionsList = [
  // 常用 outputOptions 配置
  {
    dir: "dist/es",
    entryFileNames: `[name].[hash].js`,
    chunkFileNames: "chunk-[hash].js",
    assetFileNames: "assets/[name]-[hash][extname]",
    format: "es",
    sourcemap: true,
    globals: {
      lodash: "_",
    },
  },
  // 省略其它的输出配置
];
async function build() {
  let bundle;
  let buildFailed = false;
  try {
    // 1. 调用 rollup.rollup 生成 bundle 对象
    bundle = await rollup.rollup(inputOptions);
    for (const outputOptions of outputOptionsList) {
      // 2. 拿到 bundle 对象，根据每一份输出配置，调用 generate 和 write 方法分别生成和写入产物
      const { output } = await bundle.generate(outputOptions);
      await bundle.write(outputOptions);
    }
  } catch (error) {
    buildFailed = true;
    console.error(error);
  }
  if (bundle) {
    // 最后调用 bundle.close 方法结束打包
    await bundle.close();
  }
  process.exit(buildFailed ? 1 : 0);
}
build();

//通过 rollup.rollup 方法，传入 inputOptions ，生成 bundle 对象；
//调用 bundle 对象的 generate 和 write 方法，传入 outputOptions ，分别完成
//产物和生成和磁盘写入。
//调用 bundle 对象的 close 方法来结束打包。
