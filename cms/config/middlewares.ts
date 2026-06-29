import type { Core } from '@strapi/strapi';

const uploadLimit = 512 * 1024 * 1024;

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formLimit: '512mb',
      jsonLimit: '512mb',
      textLimit: '512mb',
      formidable: {
        maxFileSize: uploadLimit,
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
