//Async + First 类型即 异步优先 的钩子
export default function alias(options) {
  // 获取 entries 配置
  const entries = getEntries(options);
  return {
    // 传入三个参数，当前模块路径、引用当前模块的模块路径、其余参数
    resolveId(importee, importer, resolveOptions) {
      // 先检查能不能匹配别名规则
      const matchedEntry = entries.find((entry) =>
        matches(entry.find, importee)
      );
      // 如果不能匹配替换规则，或者当前模块是入口模块，则不会继续后面的别名替换流程
      if (!matchedEntry || !importerId) {
        // return null 后，当前的模块路径会交给下一个插件处理
        return null;
      }
      // 正式替换路径
      const updatedId = normalizeId(
        importee.replace(matchedEntry.find, matchedEntry.replacement)
      );
      // 每个插件执行时都会绑定一个上下文对象作为 this
      // 这里的 this.resolve 会执行所有插件(除当前插件外)的 resolveId 钩子
      return this.resolve(
        updatedId,
        importer,
        Object.assign({ skipSelf: true }, resolveOptions)
      ).then((resolved) => {
        // 替换后的路径即 updateId 会经过别的插件进行处理
        let finalResult = resolved;
        if (!finalResult) {
          // 如果其它插件没有处理这个路径，则直接返回 updateId
          finalResult = { id: updatedId };
        }
        return finalResult;
      });
    },
  };
}

// 返回值为 null 时，会默认交给下一个插件的 resolveId 钩子处理。
// 返回值为 string 时，则停止后续插件的处理。这里为了让替换后的路径能被其他插件
// 处理，特意调用了 this.resolve 来交给其它插件处理，否则将不会进入到其它插件的
// 处理。
// 返回值为一个对象，也会停止后续插件的处理，不过这个对象就可以包含
// 更多的信息了，包括解析后的路径、是否被 enternal、是否需要 tree-shaking 等等
