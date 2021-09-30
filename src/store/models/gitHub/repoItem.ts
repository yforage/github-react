import { normalizeRepoOwner, RepoOwnerApi, RepoOwnerModel } from "./repoOwner";

export type RepoItemApi = {
  id: number;
  name: string;
  url: string;
  stargazers_count: number;
  owner: RepoOwnerApi;
  updated_at: string;
};

export type RepoItemModel = {
  id: number;
  name: string;
  url: string;
  stargazersCount: number;
  owner: RepoOwnerModel;
  updatedAt: Date;
};

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => ({
  id: from.id,
  name: from.name,
  url: from.url,
  stargazersCount: from.stargazers_count,
  owner: normalizeRepoOwner(from.owner),
  updatedAt: new Date(from.updated_at),
});
