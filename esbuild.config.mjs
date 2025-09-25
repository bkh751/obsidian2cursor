import esbuild from "esbuild";
import process from "process";
import path from "path";

const isProd = process.argv[2] === "production";

const ctx = await esbuild.context({
  bundle: true,
  format: "cjs",
  target: "es2018",
  platform: "node",
  logLevel: "info",
  entryPoints: ["src/main.ts"],
  outfile: "main.js",
  external: ["obsidian"],
  sourcemap: isProd ? false : "inline",
  treeShaking: true,
  drop: isProd ? ["console"] : [],
});

if (isProd) {
  await ctx.rebuild();
  process.exit(0);
} else {
  await ctx.watch();
}
