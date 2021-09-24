const apiEndpoints = {
  orgRepos: (org: string): string => `/orgs/${org}/repos`,
  repoBranches: (owner: string, repo: string): string =>
    `/repos/${owner}/${repo}/branches`,
  repoInfo: (owner: string, repo: string): string => `/repos/${owner}/${repo}`,
};

export default apiEndpoints;
