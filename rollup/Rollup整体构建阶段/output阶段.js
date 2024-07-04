const rollup = require("rollup");

async function build() {
  const bundle = await rollup.rollup({
    input: ["./src/index.js"],
  });

  let res = await bundle.generate({
    footer: "es",
  });

  console.log(res, "-----res");
}
build();
