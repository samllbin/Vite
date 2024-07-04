//import.meta.hot 对象只有在开发阶段才会被注入到全局，生产环境是访问不到的，另外
// 增加条件守卫之后，打包时识别到 if 条件不成立，会自动把这部分代码从打包产物中移
// 除，来优化资源体积。
import "./style.css";

// if (import.meta.hot) {
//   import.meta.hot.accept((mod) => mod.render());
// }

// 在这里我们同样是调用 accept 方法，与之前不同的是，第一个参数传入一个依赖的路
// 径，也就是render 模块的路径，这就相当于告诉 Vite: 我监听了 render 模块的更新，
// 当它的内容更新的时候，请把最新的内容传给我。同样的，第二个参数中定义了模块变化
// 后的回调函数，这里拿到了 render 模块最新的内容，然后执行其中的渲染逻辑，让页
// 面展示最新的内容
export const render = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = `
    <h1>Hello Vite</h1>
    <p target="_blank">This is hmr test. 这是增加的文本 再次增加12</p>
  `;
};
