1. Async & Sync
   首先是 Async 和 Sync 钩子函数，两者其实是相对的，分别代表异步和同步的钩子函
   数，两者最大的区别在于同步钩子里面不能有异步逻辑，而异步钩子可以有。
2. Parallel
   这里指并行的钩子函数。如果有多个插件实现了这个钩子的逻辑，一旦有钩子函数是异步
   逻辑，则并发执行钩子函数，不会等待当前钩子完成(底层使用 Promise.all)。
   比如对于 Build 阶段的 buildStart 钩子，它的执行时机其实是在构建刚开始的时候，各
   个插件可以在这个钩子当中做一些状态的初始化操作，但其实插件之间的操作并不是相互
   依赖的，也就是可以并发执行，从而提升构建性能。反之，对于需要依赖其他插件处理结
   果的情况就不适合用 Parallel 钩子了，比如 transform 。
3. Sequential
   Sequential 指串行的钩子函数。这种 Hook 往往适用于插件间处理结果相互依赖的情
   况，前一个插件 Hook 的返回值作为后续插件的入参，这种情况就需要等待前一个插件
   执行完 Hook，获得其执行结果，然后才能进行下一个插件相应 Hook 的调用，如
   transform 。
4. First
   如果有多个插件实现了这个 Hook，那么 Hook 将依次运行，直到返回一个非 null 或非
   undefined 的值为止。比较典型的 Hook 是 resolveId ，一旦有插件的 resolveId 返回
   了一个路径，将停止执行后续插件的 resolveId 逻辑

首先经历 options 钩子进行配置的转换，得到处理后的配置对象。
随之 Rollup 会调用 buildStart 钩子，正式开始构建流程。
Rollup 先进入到 resolveId 钩子中解析文件路径。(从 input 配置指定的入口文件
开始)。
Rollup 通过调用 load 钩子加载模块内容。
紧接着 Rollup 执行所有的 transform 钩子来对模块内容进行进行自定义的转换，
比如 babel 转译。
现在 Rollup 拿到最后的模块内容，进行 AST 分析，得到所有的 import 内容，调用
moduleParsed 钩子:
6.1 如果是普通的 import，则执行 resolveId 钩子，继续回到步骤 3。
6.2 如果是动态 import，则执行 resolveDynamicImport 钩子解析路径，如果
解析成功，则回到步骤 4 加载模块，否则回到步骤 3 通过 resolveId 解析路
径。
直到所有的 import 都解析完毕，Rollup 执行 buildEnd 钩子，Build 阶段结束。
