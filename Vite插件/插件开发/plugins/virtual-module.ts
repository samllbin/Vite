// 作为构建工具，一般需要处理两种形式的模块，一种存在于真实的磁盘文件系统中，另一
// 种并不在磁盘而在内存当中，也就是虚拟模块。通过虚拟模块，我们既可以把自己手写
// 的一些代码字符串作为单独的模块内容，又可以将内存中某些经过计算得出的变量作为模
// 块内容进行加载，非常灵活和方便
import { Plugin, ResolvedConfig } from "vite";

const virtualFibModuleId = "virtual:fib";
const resolvedFibVirtualModuleId = "\0" + virtualFibModuleId;

const virtualEnvModuleId = "virtual:env";
const resolvedEnvVirtualModuleId = "\0" + virtualEnvModuleId;

export default function virtualFibModulePlugin(): Plugin {
  let config: ResolvedConfig | null = null;
  return {
    name: "vite-plugin-virtual-fib-module",
    configResolved(c: ResolvedConfig) {
      config = c;
    },
    resolveId(id) {
      if (id === virtualFibModuleId) {
        return resolvedFibVirtualModuleId;
      }
      if (id === virtualEnvModuleId) {
        return resolvedEnvVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedFibVirtualModuleId) {
        return "export default function fib(n) { return n <= 1 ? n : fib(n - 1) + fib(n - 2); }";
      }
      if (id === resolvedEnvVirtualModuleId) {
        return `export default ${JSON.stringify(config!.env)}`;
      }
    },
  };
}
