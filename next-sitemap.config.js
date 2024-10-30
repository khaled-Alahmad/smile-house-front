const fetchSSRRoutes = async () => {
  // Add logic here to retrieve paths for your SSR routes,
  // e.g., fetching IDs or slugs from an API or database
  const routes = [{ loc: "/department" }, { loc: "/services-details/16" }]; // example routes
  return routes;
};
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://smile-house.vercel.app",
  generateRobotsTxt: true,
};

module.exports = {
  siteUrl: "https://smile-house.vercel.app",
  generateRobotsTxt: true,
  additionalPaths: async (config) => {
    const ssrRoutes = await fetchSSRRoutes();
    return ssrRoutes.map((route) => ({
      loc: route.loc,
      lastmod: new Date().toISOString(),
    }));
  },
};
