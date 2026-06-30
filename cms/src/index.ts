import type { Core } from "@strapi/strapi";
import {
  contactPageSeed,
  corporatePageSeed,
  globalSeed,
  homePageSeed,
  humanResourcesPageSeed,
  publicPermissionsSeed,
  productionPageSeed,
  qualityPageSeed,
} from "./seed/site-content";

const createSingleTypeIfMissing = async (
  strapi: Core.Strapi,
  uid: string,
  data: Record<string, unknown>,
) => {
  const existing = await strapi.db.query(uid).findOne({
    select: ["documentId"],
  });

  if (existing?.documentId) {
    return;
  }

  await strapi.documents(uid as any).create({
    status: "published",
    data,
  });
};

const ensurePublicPermissions = async (strapi: Core.Strapi, actions: string[]) => {
  const publicRole = await strapi.db.query("plugin::users-permissions.role").findOne({
    where: { type: "public" },
    select: ["id"],
  });

  if (!publicRole?.id) {
    return;
  }

  for (const action of actions) {
    const existing = await strapi.db
      .query("plugin::users-permissions.permission")
      .findOne({
        where: {
          action,
          role: publicRole.id,
        },
        select: ["id"],
      });

    if (existing?.id) {
      continue;
    }

    await strapi.db.query("plugin::users-permissions.permission").create({
      data: {
        action,
        role: publicRole.id,
      },
    });
  }
};

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await createSingleTypeIfMissing(strapi, "api::global.global", globalSeed);
    await createSingleTypeIfMissing(strapi, "api::home-page.home-page", homePageSeed);
    await createSingleTypeIfMissing(
      strapi,
      "api::corporate-page.corporate-page",
      corporatePageSeed,
    );
    await createSingleTypeIfMissing(
      strapi,
      "api::production-page.production-page",
      productionPageSeed,
    );
    await createSingleTypeIfMissing(
      strapi,
      "api::quality-page.quality-page",
      qualityPageSeed,
    );
    await createSingleTypeIfMissing(
      strapi,
      "api::human-resources-page.human-resources-page",
      humanResourcesPageSeed,
    );
    await createSingleTypeIfMissing(
      strapi,
      "api::contact-page.contact-page",
      contactPageSeed,
    );

    await ensurePublicPermissions(strapi, [
      ...publicPermissionsSeed,
      "api::career-application.career-application.create",
      "api::contact-message.contact-message.create",
      "api::job-posting.job-posting.find",
      "api::job-posting.job-posting.findOne",
      "plugin::upload.content-api.upload",
    ]);
  },
};
