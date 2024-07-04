// 这个钩子仅在开发阶段会被调用，用于扩展 Vite 的 Dev Server，一般用于增加自定义
// server 中间件，如下代码所示:
const myPlugin = () => ({
  name: "configure-server",
  configureServer(server) {
    // 姿势 1: 在 Vite 内置中间件之前执行
    server.middlewares.use((req, res, next) => {
      // 自定义请求处理逻辑
    });
    // 姿势 2: 在 Vite 内置中间件之后执行
    return () => {
      server.middlewares.use((req, res, next) => {
        // 自定义请求处理逻辑
      });
    };
  },
});
