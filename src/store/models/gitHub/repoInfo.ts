import { normalizeRepoOwner } from ".";
import { RepoOwnerApi, RepoOwnerModel } from "./repoOwner";

export type RepoInfoApi = {
  name: string;
  owner: RepoOwnerApi;
  full_name: string;
  description: string;
  language: string | null;
  created_at: string;
  updated_at: string;
};

export type RepoInfoModel = {
  name: string;
  owner: RepoOwnerModel;
  fullName: string;
  description: string;
  language: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const normalizeRepoInfo = (from: RepoInfoApi): RepoInfoModel => ({
  name: from.name,
  owner: normalizeRepoOwner(from.owner),
  fullName: from.full_name,
  description: from.description,
  language: from.language,
  createdAt: new Date(from.created_at),
  updatedAt: new Date(from.updated_at),
});
