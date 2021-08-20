// создание и использование GitHubStore
import GitHubStore from '../store/GitHubStore';
import { GetRepoListParams } from '../store/GitHubStore/types';

const list = new GitHubStore();
const orgName = 'yforage';

const listParams = {
  type: 'all',
  sort: 'updated',
  direction: 'desc',
  per_page: '20',
};

const reqParams: GetRepoListParams = {
  org: orgName,
  queryData: listParams,
};

const repoList = list.getRepoList(reqParams);
