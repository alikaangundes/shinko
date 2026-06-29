import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::human-resources-page.human-resources-page" as any,
  {
    config: {
      find: {
        auth: false,
      },
    },
  },
);
