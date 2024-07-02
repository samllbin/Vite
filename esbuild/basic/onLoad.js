build.onLoad({ filter: /.*/, namespace: "env-ns" }, (args) => {
  // 模块路径
  console.log(args.path);
  // namespace 标识
  console.log(args.namespace);
  // 后缀信息
  console.log(args.suffix);
  // 额外的插件数据
  console.log(args.pluginData);
  return {
    // 模块具体内容
    contents: "省略内容",
    // 错误信息
    errors: [],
    // 指定 loader，如`js`、`ts`、`jsx`、`tsx`、`json`等等
    loader: "json",
    // 额外的插件数据
    pluginData: null,
    // 插件名称
    pluginName: "xxx",
    // 基准路径
    resolveDir: "./dir",
    // 警告信息
    warnings: [],
    // 同上
    watchDirs: [],
    watchFiles: [],
  };
});
