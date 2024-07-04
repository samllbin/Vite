//这个钩子用来灵活控制 HTML 的内容，你可以拿到原始的 html 内容后进行任意的转换:
const htmlPlugin1 = () => {
  return {
    name: "html-transform",
    transformIndexHtml(html) {
      return html.replace(/<title>(.*?)<\/title>/, `<title>换了个标题</title>`);
    },
  };
};
// 也可以返回如下的对象结构，一般用于添加某些标签
const htmlPlugin2 = () => {
  return {
    name: "html-transform",
    transformIndexHtml(html) {
      return {
        html,
        // 注入标签
        tags: [
          {
            // 放到 body 末尾，可取值还有`head`|`head-prepend`|`body-prepend`，顾名思义
            injectTo: "body",
            // 标签属性定义
            attrs: { type: "module", src: "./index.ts" },
            // 标签名
            tag: "script",
          },
        ],
      };
    },
  };
};
