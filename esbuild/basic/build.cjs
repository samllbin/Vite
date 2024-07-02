const { build, buildSync, serve } = require("esbuild");

console.log(typeof serve);
async function runBuild() {
  // 异步方法，返回一个 Promise
  const result = await build({
    //当前目录
    absWorkingDir: process.cwd(),
    // 入口文件列表，为一个数组
    entryPoints: ["./src/index.jsx"],
    //是否需要打包
    bundle: true,
    //// 模块格式，包括`esm`、`commonjs`和`iife`
    format: "esm",
    //// 需要排除打包的依赖列表
    // external: ["react", "react-dom"],
    logLevel: "error",
    // 是否开启自动拆包
    splitting: true,
    // 是否生成 SourceMap 文件
    sourcemap: true,
    //打包产物目录
    outdir: "dist",
    ignoreAnnotations: true,
    // 是否生成打包的元信息文件
    metafile: true,
    // 是否进行代码压缩
    minify: true,
  });
  console.log(result);
}

function runBuildSync() {
  // 同步方法
  const result = buildSync({
    // 省略一系列的配置
  });
  console.log(result);
}
// runBuild();

//开启 serve 模式后，将在指定的端口和目录上搭建一个静态文件服务，这个服务器
//用原生 Go 语言实现，性能比 Nodejs 更高。
//类似 webpack-dev-server，所有的产物文件都默认不会写到磁盘，而是放在内存
//中，通过请求服务来访问。
//每次请求到来时，都会进行重新构建(rebuild)，永远返回新的产物。

//值得注意的是，触发 rebuild 的条件并不是代码改动，而是新的请求到来。
function runBuildServe() {
  serve(
    {
      port: 8000,
      //静态资源目录
      servedir: "./dist",
    },
    {
      absWorkingDir: process.cwd(),
      entryPoints: ["./src/index.jsx"],
      bundle: true,
      format: "esm",
      // external: ["react", "react-dom"],
      logLevel: "error",
      splitting: true,
      sourcemap: true,
      // outdir: "dist",
      ignoreAnnotations: true,
      metafile: true,
      // minify: false,
    }
  ).then((server) => {
    console.log("HTTP Server starts at port", server.port);
  });
}

runBuildServe();
