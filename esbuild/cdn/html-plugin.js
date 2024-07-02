const { createLink, createScript, generateHTML } = require("./util");
const path = require("path");
const fs = require("fs/promises");

module.exports = () => {
  return {
    name: "esbuild:html",
    setup(build) {
      build.onEnd(async (buildResult) => {
        console.log(buildResult, "buildResult-------------");
        if (buildResult.errors.length) {
          return;
        }
        let { metafile } = buildResult;
        let script = [];
        let link = [];

        if (metafile) {
          const { outputs } = metafile;
          const assests = Object.keys(outputs);

          assests.forEach((assest) => {
            if (assest.endsWith(".js")) {
              script.push(createScript(assest));
            } else if (assest.endsWith(".css")) {
              link.push(createLink(assest));
            }
          });
        }
        const templateContent = generateHTML(script, link);
        const templatePath = path.join(process.cwd(), "index.html");
        await fs.writeFile(templatePath, templateContent);
      });
    },
  };
};
