import { ScullyConfig } from '@scullyio/scully';
import '@scullyio/scully-plugin-puppeteer';
export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "webshop",
  distFolder: './dist/webshop',
  outDir: './dist/static',
  routes: {},
};
