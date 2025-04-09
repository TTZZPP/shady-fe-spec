import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import { searchPlugin } from "@vuepress/plugin-search";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme({
    navbar: [
      // 在 2.x 中 nav 改为 navbar
      { text: "首页", link: "/index.md" },
      {
        text: "编码规范",
        children: [
          // 在 2.x 中 items 改为 children
          { text: "HTML 编码规范", link: "/coding/html.md" },
          { text: "CSS 编码规范", link: "/coding/css.md" },
          { text: "JavaScript 编码规范", link: "/coding/javascript.md" },
          { text: "Node 编码规范", link: "/coding/node.md" },
          { text: "Typescript 编码规范", link: "/coding/typescript.md" },
        ],
      },
      {
        text: "工程规范",
        children: [
          { text: "Git 规范", link: "/engineering/git.md" },
          { text: "文档规范", link: "/engineering/doc.md" },
          { text: "CHANGELOG 规范", link: "/engineering/changelog.md" },
        ],
      },
    ],
    sidebar: [
      {
        text: "编码规范", // 在 2.x 中 title 改为 text
        children: [
          {
            text: "HTML 编码规范", // title 改为 text
            link: "/coding/html.md", // path 改为 link
          },
          {
            text: "CSS 编码规范",
            link: "/coding/css.md",
          },
          {
            text: "JavaScript 编码规范",
            link: "/coding/javascript.md",
          },
          {
            text: "Node 编码规范",
            link: "/coding/node.md",
          },
          {
            text: "Typescript 编码规范",
            link: "/coding/typescript.md",
          },
        ],
      },
      {
        text: "工程规范",
        children: [
          {
            text: "Git 规范",
            link: "/engineering/git.md",
          },
          {
            text: "文档规范",
            link: "/engineering/doc.md",
          },
          {
            text: "CHANGELOG 规范",
            link: "/engineering/changelog.md",
          },
        ],
      },
    ],
    logo: "/img/logo.png",
    repo: "TTZZPP/shady-fe-spec",
    docsDir: "docs",
  }),

  head: [
    // ["link", { rel: "icon", href: "/img/logo.png" }],
    [
      "meta",
      {
        name: "keywords",
        content: "前端编码规范工程化",
      },
    ],
  ],

  locales: {
    "/": {
      lang: "zh-CN",
      title: "SHADY",
      description: "前端编码规范工程化",
    },
  },
  base: "/shady-fe-spec/",
  plugins: [
    searchPlugin({
      locales: {
        "/": {
          placeholder: "搜索文档",
        },
      },
      maxSuggestions: 10,
    }),
  ],
});
