// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Neptun',
  tagline: 'CICD configs with ease using AI. No entry barrier. CICD for everyone.',
  favicon: 'https://avatars.githubusercontent.com/u/159569401?s=400&u=0a09dd65d019b52d0ba238b71b9566c5c4619161&v=4',

  // Set the production url of your site here
  url: 'https://neptun-ai-models.pages.dev',
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
    locales: ['en'],
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
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'https://avatars.githubusercontent.com/u/159569401?s=400&u=0a09dd65d019b52d0ba238b71b9566c5c4619161&v=4',
      navbar: {
        title: 'Neptun',
        logo: {
          alt: 'Neptun Logo',
          src: 'https://avatars.githubusercontent.com/u/159569401?s=400&u=0a09dd65d019b52d0ba238b71b9566c5c4619161&v=4'
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'modelsSidebar',
            position: 'left',
            label: 'Models'
          },
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right'
          }
        ]
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Neptun, Inc. Built with Docusaurus.`
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula
      }
    })
};

export default config;
