// Vite 在解析完配置之后会调用configResolved 钩子，这个钩子一般用来记录最终的配置
// 信息，而不建议再修改配置，用法如下图所示:
const exmaplePlugin = () => {
  let config;
  return {
    name: "read-config",
    configResolved(resolvedConfig) {
      // 记录最终配置
      config = resolvedConfig;
    },
    // 在其他钩子中可以访问到配置
    transform(code, id) {
      console.log(config);
    },
  };
};
