import { Plugin } from "vite";
import * as fs from "fs";
import React from "react";
interface SvgrOptions {
  defaultExport: "url" | "component";
}

export default function viteSvgrPlugin(options: SvgrOptions): Plugin {
  const { defaultExport = "component" } = options;

  return {
    name: "vite-plugin-svgr",

    async transform(code, id) {
      if (!id.endsWith(".svg")) {
        return code;
      }
      console.log(code);
      const svgrTransform = (await import("@svgr/core")).transform;
      // const esbuildPackagePath = resolve.sync("esbuild", {
      //   paths: [require.resolve("vite")],
      // });
      // const esbuildPackagePath = await findUp("node_modules/esbuild");
      // const esbuild = await import(
      //   // "../node_modules/vite/node_modules/.bin/esbuild"
      // );
      const esbuild = await import("esbuild");
      const svg = await fs.promises.readFile(id, "utf8");
      const svgrResult = await svgrTransform(
        svg,
        {},
        { componentName: "ReactComponent" }
      );
      let componentCode = svgrResult;
      if (defaultExport === "url") {
        componentCode = svgrResult.replace(
          "export default ReactComponent",
          "export { ReactComponent }"
        );
        // 加上 Vite 默认的 `export default 资源路径`
        componentCode += code;
      }
      const result = await esbuild.transform(componentCode, {
        loader: "jsx",
      });
      console.log(result);
      return {
        code: result.code,
        map: null,
      };
    },
  };
}
