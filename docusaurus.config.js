// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config
// https://npmtrends.com/docusaurus-vs-vitepress-vs-vuepress

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Neptun',
  tagline: 'Automated Tech Stack Configuration powered by AI.',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://neptun-ai-tools-docs.pages.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'neptun', // Usually your GitHub org/user name.
  projectName: 'neptun-docker-cicd', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/neptun-software/neptun-ai-tools-docs',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
  },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/favicon.png',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Neptun',
        logo: {
          alt: 'Neptun Logo',
          src: 'img/logo.png'
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'modelsSidebar',
            position: 'left',
            label: 'Docs'
          },
          {
            href: 'https://github.com/neptun-software',
            label: 'GitHub',
            position: 'right'
          },
          {
            type: 'localeDropdown',
          },
        ]
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Neptun, Inc. Built with Docusaurus.`
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula
      },
      zoom: {
        selector: 'img',
        config: {
          scrollOffset: 100
        }
      }
    }),

    plugins: [
      require.resolve("docusaurus-plugin-image-zoom") // TODO: implement own image zoom, because this one sucks
    ]
};

export default config;
