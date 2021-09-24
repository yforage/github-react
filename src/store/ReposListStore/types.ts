export type GetRepoListParams = {
  orgName: string;
  type?: string;
  sort?: string;
  direction?: string;
  per_page?: number;
  page?: number;
};

export interface IReposListStore {
  getReposList(params: GetRepoListParams): Promise<void>;
}
