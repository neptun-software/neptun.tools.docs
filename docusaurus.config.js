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
          lastmod: "date",
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes("/page/"));
          },
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themes: ["@docusaurus/theme-mermaid"],
  markdown: {
    mermaid: true,
    format: "mdx",
    mdx1Compat: {
      comments: true,
      admonitions: true,
      headingIds: true,
    },
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
        additionalLanguages: ["sql", "mermaid"],
      },
    }),

  // https://github.com/rdilweb/docusaurus-plugin-remote-content/issues/37#issuecomment-1840575140
  plugins: [
    require.resolve("docusaurus-lunr-search"),
    "docusaurus-plugin-sass",
    [
      "docusaurus-plugin-remote-content",
      {
        name: "neptun-web-docs",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/neptun-software/neptun.web/refs/heads/main/public/docs",
        documents: [
          "api-ai-{model_publisher}-{model_name}-chat.post.md",
          "api-ai-cloudflare-{model_name}-chat.post.md",
          "api-ai-huggingface-{model_publisher}-{model_name}-chat.post.md",
          "api-ai-ollama-{model_name}-chat.post.md",
          "api-ai-openrouter-{model_name}-chat.post.md",
          "api-auth-check.head.md",
          "api-auth-login.post.md",
          "api-auth-logout.post.md",
          "api-auth-sign-up.post.md",
          "api-html-to-markdown-{url}.get.md",
          "api-og-{url}.get.md",
          "api-shared-chats-{uuid}.get.md",
          "api-shared-collections.get.md",
          "api-shared-collections-{uuid}.get.md",
          "api-users-{user_id}.delete.md",
          "api-users-{user_id}.patch.md",
          "api-users-{user_id}-chats.get.post.delete.md",
          "api-users-{user_id}-chats-{chat_id}.delete.md",
          "api-users-{user_id}-chats-{chat_id}.patch.md",
          "api-users-{user_id}-chats-{chat_id}-files.get.md",
          "api-users-{user_id}-chats-{chat_id}-files-{message_id}.post.md",
          "api-users-{user_id}-chats-{chat_id}-messages.get.md",
          "api-users-{user_id}-chats-{chat_id}-messages.post.md",
          "api-users-{user_id}-chats-{chat_id}-messages-last.delete.md",
          "api-users-{user_id}-chats-{chat_id}-shares.get.md",
          "api-users-{user_id}-chats-{chat_id}-shares.post.md",
          "api-users-{user_id}-chats-{chat_id}-shares-{share_id}-whitelist-entries.post.md",
          "api-users-{user_id}-cli.get.md",
          "api-users-{user_id}-collections.get.md",
          "api-users-{user_id}-collections.post.md",
          "api-users-{user_id}-collections-{collection_id}.delete.md",
          "api-users-{user_id}-collections-{collection_id}.patch.md",
          "api-users-{user_id}-collections-{collection_id}-templates.post.md",
          "api-users-{user_id}-collections-{collection_id}-templates-{template_id}.delete.md",
          "api-users-{user_id}-collections-{collection_id}-templates-{template_id}.get.md",
          "api-users-{user_id}-collections-{collection_id}-templates-{template_id}.patch.md",
          "api-users-{user_id}-files.get.md",
          "api-users-{user_id}-installations.get.md",
          "api-users-{user_id}-installations-{installation_id}.delete.md",
          "api-users-{user_id}-installations-{installation_id}-imports.get.md",
          "api-users-{user_id}-projects.get.md",
          "api-users-{user_id}-projects.post.md",
          "api-users-{user_id}-projects-{project_id}.delete.md",
          "api-users-{user_id}-projects-{project_id}.get.md",
          "api-users-{user_id}-projects-{project_id}.patch.md",
          "api-users-{user_id}-projects-{project_id}-chats.get.md",
          "api-users-{user_id}-projects-{project_id}-chats.post.md",
          "api-users-{user_id}-projects-{project_id}-chats-{chat_id}.delete.md",
          "api-users-{user_id}-projects-{project_id}-chats.delete.md",
          "api-users-{user_id}-projects-{project_id}-context.get.md",
          "api-users-{user_id}-projects-{project_id}-context.post.md",
          "api-users-{user_id}-projects-{project_id}-context-markdown.get.md",
          "api-users-{user_id}-projects-{project_id}-resources-{resource_type}.get.md",
          "api-users-{user_id}-projects-{project_id}-resources-{resource_type}.post.md",
          "api-users-{user_id}-projects-{project_id}-resources-{resource_type}-{resource_id}.delete.md",
          "api-users-{user_id}-projects-{project_id}-resources-{resource_type}-{resource_id}.get.md",
          "api-users-{user_id}-projects-{project_id}-resources-files.get.md",
          "api-users-{user_id}-projects-{project_id}-resources-files.post.md",
          "api-users-{user_id}-projects-{project_id}-resources-files-{context_file_id}.delete.md",
          "api-users-{user_id}-projects-{project_id}-resources-files-{context_file_id}.put.md",
          "api-users-{user_id}-projects-{project_id}-resources-imports.get.md",
          "api-users-{user_id}-projects-{project_id}-resources-imports.post.md",
          "api-users-{user_id}-projects-{project_id}-resources-imports-{import_id}.delete.md",
          "api-users-{user_id}-projects-{project_id}-resources-imports-{import_id}.put.md",
          "auth-otp.post.md",
          "email-{email}-reset-password.post.md",
          "health.get.md",
          "models.get.md",
          "api-github-accounts-{github_account_name}-repositories-{github_repository_name}-configuration-files.get.md",
          "api-github-app-accounts-{github_account_id}-repositories-{github_repository_id}-configuration-files.get.md",
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
    [
      "docusaurus-plugin-remote-content",
      {
        name: "neptun-web-schema",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/neptun-software/neptun.web/refs/heads/main/backup/schema",
        documents: ["schema.mermaid", "schema.sql"],
        outDir: "docs/assets/_schema",
        modifyContent(_filename, content) {
          if (_filename.endsWith(".mermaid")) {
            return {
              filename: "schema.mermaid.md",
              content: "```mermaid\n" + content?.trim() + "\n```",
            };
          }
          if (_filename.endsWith(".sql")) {
            return {
              filename: "schema.sql.md",
              content: "```sql\n" + content?.trim() + "\n```",
            };
          }

          return {
            content,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "neptun-web-schema-image",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/neptun-software/neptun.web/refs/heads/main/backup/schema",
        documents: ["schema.png"],
        outDir: "docs/assets/_schema",
        requestConfig: { responseType: "arraybuffer" },
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
