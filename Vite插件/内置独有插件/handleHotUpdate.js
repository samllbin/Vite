// 这个钩子会在 Vite 服务端处理热更新时被调用，你可以在这个钩子中拿到热更新相关的
// 上下文信息，进行热更模块的过滤，或者进行自定义的热更处理。下面是一个简单的例
// 子:
const handleHmrPlugin = () => {
  return {
    async handleHotUpdate(ctx) {
      // 需要热更的文件
      console.log(ctx.file);
      // 需要热更的模块，如一个 Vue 单文件会涉及多个模块
      console.log(ctx.modules);
      // 时间戳
      console.log(ctx.timestamp);
      // Vite Dev Server 实例
      console.log(ctx.server);
      // 读取最新的文件内容
      console.log(await read());
      // 自行处理 HMR 事件
      ctx.server.ws.send({
        type: "custom",
        event: "special-update",
        data: { a: 1 },
      });
      return [];
    },
  };
};
// 前端代码中加入
if (import.meta.hot) {
  import.meta.hot.on("special-update", (data) => {
    // 执行自定义更新
    // { a: 1 }
    console.log(data);
    window.location.reload();
  });
}
