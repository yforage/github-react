import ApiStore from '../../shared/store/ApiStore';
import { HTTPMethod } from '../../shared/store/ApiStore/types';
import {
  GetRepoListParams, PostCreateRepoParams, IGitHubStore, ApiResp,
} from './types';

export default class GitHubStore implements IGitHubStore {
  private apiStore = new ApiStore();

  async postCreateRepo<SuccessT>({ org, ...params }: PostCreateRepoParams): Promise<ApiResp<SuccessT>> {
    const endpoint = `/orgs/${org}/repos`;
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

  async getRepoList<SuccessT>({ org, ...params }: GetRepoListParams): Promise<ApiResp<SuccessT>> {
    const endpoint = `/orgs/${org}/repos`;
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
