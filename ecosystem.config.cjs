module.exports = {
  apps: [
    {
      name: "shinko-frontend",
      cwd: "/var/www/shinko/frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1 -p 3000",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "shinko-cms",
      cwd: "/var/www/shinko/cms",
      script: "node_modules/@strapi/strapi/bin/strapi.js",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
