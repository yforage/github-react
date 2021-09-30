const links = {
  branchLink: (owner: string, repoName: string, branchName: string): string =>
    `https://github.com/${owner}/${repoName}/tree/${branchName}`,
};

export default links;
