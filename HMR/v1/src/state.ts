// 其中设置了一个定时器，但当模块更改之后，这个定时器并没有被销毁，紧接着我们在
// accept 方法调用 initState 方法又创建了一个新的定时器，导致 count 的值错乱。那
// 这就涉及到新的 HMR 方法——dispose方法了。

// 原来的状态丢失了，count的内容从64突然变成1
// 当我们改动了state模块的代码，main模块接受更新，执行 accept 方法中的回调，接
// 着会执行 state 模块的initState 方法。注意了，此时新建的 initState 方法的确会
// 初始化定时器，但同时也会初始化 count 变量，也就是count从 0 开始计数了
// 共享数据: hot.data 属性
// 这个属性用来在不同的模块实例间共享一些数据。
let timer: number | undefined;

if (import.meta.hot) {
  if (!import.meta.hot.data.count) {
    import.meta.hot.data.count = 0;
  }
  import.meta.hot.dispose(() => {
    if (timer) {
      clearInterval(timer);
    }
  });
}

export function initState() {
  const getAndIncCount = () => {
    const data = import.meta.hot?.data || {
      count: 0,
    };
    data.count = data.count + 1;
    console.log(import.meta.hot, "-------hot");
    return data.count;
  };
  timer = setInterval(() => {
    let countEle = document.getElementById("count");
    countEle!.innerText = getAndIncCount() + "";
  }, 1000);
}
