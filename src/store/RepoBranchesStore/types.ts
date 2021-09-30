export type GetRepoBranchesParams = {
  owner: string;
  repo: string;
  per_page?: number;
  page?: number;
};

export interface IRepoBranchesStore {
  getRepoBranches(params: GetRepoBranchesParams): Promise<void>;
}
