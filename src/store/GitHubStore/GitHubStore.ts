import ApiStore from '../../shared/store/ApiStore';
import { HTTPMethod } from '../../shared/store/ApiStore/types';
import {
  GetRepoListParams, PostCreateRepoParams, IGitHubStore, ApiResp,
} from './types';

export default class GitHubStore implements IGitHubStore {
  private apiStore = new ApiStore();

  async postCreateRepo<RespT>({ orgName, ...params }: PostCreateRepoParams): Promise<ApiResp<RespT>> {
    const endpoint = `/orgs/${orgName}/repos`;
    const sendParams = {
      method: HTTPMethod.POST,
      endpoint,
      headers: { accept: 'application/vnd.github.v3+json' },
      data: params,
    };
    const apiResponse = await this.apiStore.request(sendParams);
    return {
      data: apiResponse.data,
    };
  }

  async getRepoList<RespT>({ orgName, ...params }: GetRepoListParams): Promise<ApiResp<RespT>> {
    const endpoint = `/orgs/${orgName}/repos`;
    const sendParams = {
      method: HTTPMethod.GET,
      endpoint,
      headers: { accept: 'application/vnd.github.v3+json' },
      data: params,
    };
    const apiResponse = await this.apiStore.request(sendParams);
    return {
      data: apiResponse.data,
    };
  }
}
