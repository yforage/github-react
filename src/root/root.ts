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

api.getRepoList(getReposParams).then((result) => {
  console.log(result);
});

const addRepoParams = {
  orgName,
  name: 'kts-frontend',
  description: 'My new repo for project',
  private: true,
  has_projects: false,
};

api.postCreateRepo(addRepoParams).then((result) => {
  console.log(result);
});
