import ApiStore from '../../shared/store/ApiStore';
import { RequestParams } from '../../shared/store/ApiStore/types';
import {
  ApiResp, GetRepoListParams, IGitHubStore,
} from './types';

export default class GitHubStore implements IGitHubStore {
  private apiStore = new ApiStore();
  /*
  async postCreateRepo(params: PostCreateRepoParams): Promise<ApiResp<PostCreateRepoResp>> {
    const endpoint = `/orgs/${params.org}/repos`;
    const sendParams: RequestParams<object> = {
      method: 'POST',
      endpoint,
      headers: { accept: 'application/vnd.github.v3+json' },
      data: params.bodyData,
    };
    const apiResponse = this.apiStore.request(sendParams);
    const result: ApiResp<PostCreateRepoResp> = {
      success: (await apiResponse).success,
      data: (await apiResponse).data,
    };
    return result;
  }
  */

  async getRepoList(params: GetRepoListParams): Promise<ApiResp<GetRepoListResp>> {
    const endpoint = `/orgs/${params.org}/repos`;
    const sendParams: RequestParams<object> = {
      method: 'GET',
      endpoint,
      headers: { accept: 'application/vnd.github.v3+json' },
      data: params.queryData,
    };
    const apiResponse = this.apiStore.request(sendParams);
    const result: ApiResp<GetRepoListResp> = {
      success: (await apiResponse).success,
      data: (await apiResponse).data,
    };
    return result;
  }
}
