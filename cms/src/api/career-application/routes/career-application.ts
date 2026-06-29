import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::career-application.career-application" as any,
  {
    config: {
      create: {
        auth: false,
      },
    },
  },
);
