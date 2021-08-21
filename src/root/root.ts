// создание и использование GitHubStore
import GitHubStore from '../store/GitHubStore';

const api = new GitHubStore();
const orgName = 'yforage';

const getReposParams = {
  orgName,
  type: 'all',
  sort: 'updated',
  per_page: 20,
};

const repoList = api.getRepoList(getReposParams);
console.log(repoList);

const addRepoParams = {
  orgName,
  name: "kts-frontend",
  description: "My new repo for project",
  private: true,
  has_projects: false,
}
const addNewRepoResult = api.postCreateRepo(addRepoParams);
console.log(addNewRepoResult);