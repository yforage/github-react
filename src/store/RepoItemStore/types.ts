export type GetRepoInfoParams = {
  owner: string;
  name: string;
};

export interface IRepoItemStore {
  getRepoInfo(params: GetRepoInfoParams): Promise<void>;
}
