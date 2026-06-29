import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::job-posting.job-posting" as any, {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
});
