import apiEndpoints from "@config/api";

import ApiStore from "../../shared/store/ApiStore";
import { ApiResponse, HTTPMethod } from "../../shared/store/ApiStore/types";
import {
  GetRepoListParams,
  PostCreateRepoParams,
  IGitHubStore,
  RepoItem,
  GetRepoBranchesParams,
  BranchesItem,
  RepoInfoItem,
  GetRepoInfoParams,
} from "./types";

export default class GitHubStore implements IGitHubStore {
  private readonly baseUrl = "https://api.github.com";

  private readonly apiStore = new ApiStore(this.baseUrl);

  async postCreateRepo({
    orgName,
    ...params
  }: PostCreateRepoParams): Promise<ApiResponse<RepoItem[], {}>> {
    const sendParams = {
      method: HTTPMethod.POST,
      endpoint: apiEndpoints.orgRepos(orgName),
      headers: { accept: "application/vnd.github.v3+json" },
      data: params,
    };
    return this.apiStore.request(sendParams);
  }

  async getRepoList({
    orgName,
    ...params
  }: GetRepoListParams): Promise<ApiResponse<RepoItem[], {}>> {
    const sendParams = {
      method: HTTPMethod.GET,
      endpoint: apiEndpoints.orgRepos(orgName),
      headers: {
        accept: "application/vnd.github.v3+json",
      },
      data: params,
    };
    return this.apiStore.request(sendParams);
  }

  async getRepoBranches({
    owner,
    repo,
    ...params
  }: GetRepoBranchesParams): Promise<ApiResponse<BranchesItem[], {}>> {
    const sendParams = {
      method: HTTPMethod.GET,
      endpoint: apiEndpoints.repoBranches(owner, repo),
      headers: {
        accept: "application/vnd.github.v3+json",
      },
      data: params,
    };
    return this.apiStore.request(sendParams);
  }

  async getRepoInfo({
    owner,
    name,
  }: GetRepoInfoParams): Promise<ApiResponse<RepoInfoItem, {}>> {
    const sendParams = {
      method: HTTPMethod.GET,
      endpoint: apiEndpoints.repoInfo(owner, name),
      headers: {
        accept: "application/vnd.github.v3+json",
      },
      data: "",
    };
    return this.apiStore.request(sendParams);
  }
}
