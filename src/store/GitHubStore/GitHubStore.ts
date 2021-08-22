import ApiStore from '../../shared/store/ApiStore';
import { HTTPMethod } from '../../shared/store/ApiStore/types';
import {
  GetRepoListParams, PostCreateRepoParams, IGitHubStore, ApiResp,
} from './types';

const orgReposEndpoint = (org: string) => `/orgs/${org}/repos`;

export default class GitHubStore implements IGitHubStore {
  private readonly baseUrl = 'https://api.github.com';

  private readonly apiStore = new ApiStore(this.baseUrl);

  async postCreateRepo({ orgName, ...params }: PostCreateRepoParams): Promise<ApiResp<{}>> {
    const sendParams = {
      method: HTTPMethod.POST,
      endpoint: orgReposEndpoint(orgName),
      headers: { accept: 'application/vnd.github.v3+json' },
      data: params,
    };
    return this.apiStore.request(sendParams);
  }

  async getRepoList<RespT>({ orgName, ...params }: GetRepoListParams): Promise<ApiResp<RespT>> {
    const sendParams = {
      method: HTTPMethod.GET,
      endpoint: orgReposEndpoint(orgName),
      headers: { accept: 'application/vnd.github.v3+json' },
      data: params,
    };
    return this.apiStore.request(sendParams);
  }
}
