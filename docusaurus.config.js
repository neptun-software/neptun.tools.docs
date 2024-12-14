// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config
// https://npmtrends.com/docusaurus-vs-vitepress-vs-vuepress

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Neptun",
  tagline: "Automated Tech Stack Configuration powered by AI.",
  favicon: "img/favicon.png",

  // The production url of the site
  url: "https://neptun-ai-tools-docs.pages.dev",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  organizationName: "neptun",
  projectName: "neptun.tools.docs",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en", "de"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          /* docItemComponent: "@theme/ApiItem", */
          editUrl: ({ docPath }) => {
            if (docPath.startsWith("web-interface/api/")) {
              return (
                "https://github.com/neptun-software/neptun.web/edit/main/public/docs/" +
                docPath.replace("web-interface/api/", "")
              );
            }
            return (
              "https://github.com/neptun-software/neptun.tools.docs/edit/main/docs/" +
              docPath
            );
          },
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themes: ["@docusaurus/theme-mermaid"/* , "docusaurus-theme-openapi-docs" */],
  markdown: {
    mermaid: true,
  },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/favicon.png",
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: "Neptun",
        logo: {
          alt: "Neptun Logo",
          src: "img/logo.png",
          srcDark: "img/logo-light.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "modelsSidebar",
            position: "left",
            label: "Docs",
          },
          {
            href: "https://github.com/neptun-software",
            label: "GitHub",
            position: "right",
          },
          {
            type: "localeDropdown",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} Neptun, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),

  plugins: [
    require.resolve('docusaurus-lunr-search'),
    'docusaurus-plugin-sass',
    [
      "docusaurus-plugin-remote-content",
      {
        name: "neptun-web-docs",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/neptun-software/neptun.web/refs/heads/main/public/docs",
        documents: [
          "api_ai_huggingface_chat.md",
          "api_auth_check.md",
          "api_auth_login.md",
          "api_auth_logout.md",
          "api_auth_sign-up.md",
          "api_html-to-markdown.md",
          "api_shared_chats.md",
          "api_users_chats_delete.md",
          "api_users_chats_files_create.md",
          "api_users_chats_files.md",
          "api_users_chats_messages_create.md",
          "api_users_chats_messages_last_delete.md",
          "api_users_chats_messages.md",
          "api_users_chats_shares_create.md",
          "api_users_chats_shares_whitelist_entries_create.md",
          "api_users_chats_shares.md",
          "api_users_chats_update.md",
          "api_users_chats.md",
          "api_users_cli.md",
          "api_users_delete.md",
          "api_users_installations_imports.md",
          "api_users_installations.md",
          "api_users_update.md",
          "auth_otp.md",
          "email_reset-password.md",
          "health.md",
        ],
        outDir: "docs/web-interface/api",
        modifyContent(_filename, content) {
          const codeBlocks = [];
          let modifiedContent = content.replace(/```[\s\S]*?```/g, (match) => {
            codeBlocks.push(match);
            return "###CODE_BLOCK###";
          });

          // replace all {token} with [token], because the markdown parser does see them as
          // template literals which causes `token is not defined`, for example in the
          // "Huggingface Chat Endpoint" and in the "Shared Chat Messages Endpoint"
          modifiedContent = modifiedContent.replace(/{([^}]*)}/g, "[$1]");

          codeBlocks.forEach((block) => {
            modifiedContent = modifiedContent.replace(
              "###CODE_BLOCK###",
              block
            );
          });

          return { content: modifiedContent };
        },
      },
    ],
    // openapi.json would need summary and operationId for this to work (waiting for nitro update...)
    // [
    //   'docusaurus-plugin-openapi-docs',
    //   {
    //     id: "openapi",
    //     docsPluginId: "classic",
    //     config: {
    //       /** @type {import('docusaurus-plugin-openapi-docs').Options} */
    //       neptun: {
    //         specPath: "https://raw.githubusercontent.com/neptun-software/neptun.web/refs/heads/main/public/docs/openapi.json",
    //         downloadUrl: "https://raw.githubusercontent.com/neptun-software/neptun.web/refs/heads/main/public/docs/openapi.json",
    //         outputDir: "docs/openapi",
    //         sidebarOptions: {
    //           groupPathsBy: "tag",
    //         },
    //         showSchemas: true,
    //       },
    //     }
    //   },
    // ]
  ],
};

export default config;
