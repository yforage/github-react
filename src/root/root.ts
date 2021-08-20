// создание и использование GitHubStore
import GitHubStore from '../store/GitHubStore';
import { GetRepoListParams, PostCreateRepoParams } from '../store/GitHubStore/types';

const api = new GitHubStore();
const org = 'yforage';
const getReposParams = {
  type: 'all',
  sort: 'updated',
  per_page: '20',
};

const reqParams: GetRepoListParams = {
  org,
};

const addRepoParams: PostCreateRepoParams = {
  org,
  name: "kts-frontend",
  description: "My new repo for project",
  private: true,
  has_projects: false,
}
const addNewRepoResult = api.postCreateRepo(addRepoParams);
const repoList = api.getRepoList(reqParams);
