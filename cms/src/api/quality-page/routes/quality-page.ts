import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::quality-page.quality-page" as any, {
  config: {
    find: {
      auth: false,
    },
  },
});
