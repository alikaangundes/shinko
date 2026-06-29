import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::corporate-page.corporate-page" as any, {
  config: {
    find: {
      auth: false,
    },
  },
});
