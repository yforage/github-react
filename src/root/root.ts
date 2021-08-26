// создание и использование GitHubStore
import GitHubStore from '../store/GitHubStore';

const api = new GitHubStore();
const orgName = 'ktsstudio';

const getReposParams = {
  orgName,
  sort: 'updated',
  type: 'public',
};

api.getRepoList(getReposParams).then((result) => {
  if (result.success) {
    console.log(result.data.map((repo) => repo.stargazers_count));
  }
});

const addRepoParams = {
  orgName,
  name: 'kts-frontend',
  description: 'My new repo for project',
  private: true,
  has_projects: false,
};

api.postCreateRepo(addRepoParams).then((result) => {
  if (result.success) {
    console.log(result.data.map((repo) => repo.name));
  } else {
    console.log(result.data);
  }
});
