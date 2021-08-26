import ApiStore from '../../shared/store/ApiStore';
import { ApiResponse, HTTPMethod } from '../../shared/store/ApiStore/types';
import {
  GetRepoListParams, PostCreateRepoParams, IGitHubStore, RepoItem,
} from './types';

const orgReposEndpoint = (org: string) => `/orgs/${org}/repos`;

export default class GitHubStore implements IGitHubStore {
  private readonly baseUrl = 'https://api.github.com';

  private readonly apiStore = new ApiStore(this.baseUrl);

  async postCreateRepo({ orgName, ...params }: PostCreateRepoParams): Promise<ApiResponse<RepoItem[], {}>> {
    const sendParams = {
      method: HTTPMethod.POST,
      endpoint: orgReposEndpoint(orgName),
      headers: { accept: 'application/vnd.github.v3+json' },
      data: params,
    };
    return this.apiStore.request(sendParams);
  }

  async getRepoList({ orgName, ...params }: GetRepoListParams): Promise<ApiResponse<RepoItem[], {}>> {
    const sendParams = {
      method: HTTPMethod.GET,
      endpoint: orgReposEndpoint(orgName),
      headers: { accept: 'application/vnd.github.v3+json' },
      data: params,
    };
    return this.apiStore.request(sendParams);
  }
}
