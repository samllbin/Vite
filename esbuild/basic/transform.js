const { transform, transformSync } = require("esbuild");
async function runTransform() {
  // 第一个参数是代码字符串，第二个参数为编译配置
  const content = await transform(
    "const isNull = (str: string): boolean => str.length > 0;", //将这个tsx转为js
    {
      sourcemap: true,
      loader: "tsx",
    }
  );
  console.log(content);
}

async function runTransform() {
  const content = await transformSync(/* 参数和 transform 相同 */);
  console.log(content);
}
runTransform();
