// Vite 在读取完配置文件（即vite.config.ts ）之后，会拿到用户导出的配置对象，然后
// 执行 config 钩子。在这个钩子里面，你可以对配置文件导出的对象进行自定义的操作，
// 如下代码所示:

// 返回部分配置（推荐）
const editConfigPlugin = () => ({
  name: "vite-plugin-modify-config",
  config: () => ({
    alias: {
      react: require.resolve("react"),
    },
  }),
});

// 官方推荐的姿势是在 config 钩子中返回一个配置对象，这个配置对象会和 Vite 已有的配
// 置进行深度的合并。不过你也可以通过钩子的入参拿到 config 对象进行自定义的修改，
// 如下代码所示:
const mutateConfigPlugin = () => ({
  name: "mutate-config",
  // command 为 `serve`(开发环境) 或者 `build`(生产环境)
  config(config, { command }) {
    // 生产环境中修改 root 参数
    if (command === "build") {
      config.root = __dirname;
    }
  },
});
