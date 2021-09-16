const routes = {
  main: { mask: "/" },
  repos: { mask: "/repos" },
  repoInfo: {
    mask: "/repos/:owner/:name",
    create: (owner: string, name: string): string => `/repos/${owner}/${name}`,
  },
};

export default routes;
