const rollup = require("rollup");
const util = require("util");
async function build() {
  const bundle = await rollup.rollup({
    input: ["./src/index.js"],
  });
  console.log(util.inspect(bundle));
}
build();

// 从信息中可以看出，目前经过 Build 阶段的 bundle 对象其实并没有进行模块的
// 打包，这个对象的作用在于存储各个模块的内容及依赖关系，同时暴露generate和
// write 方法，以进入到后续的 Output 阶段（write 和generate 方法唯一的区别在于前
// 者打包完产物会写入磁盘，而后者不会）。
// 所以，真正进行打包的过程会在 Output 阶段进行，即在bundle对象的 generate或者
// write 方法中进行。
