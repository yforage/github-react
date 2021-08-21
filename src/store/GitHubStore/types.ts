/** Интерфейс класса для работы с GitHub API
 * названия getSomeData и postSomeData
 * (а также типов GetSomeDataParams и PostSomeDataPrams)
 * поменяйте в соответствии с выполняемым запросом.
 * Выберите любой запрос из публичного API GitHub.
 */

export type PostCreateRepoParams = {
  orgName: string,
  name: string,
  description?: string,
  homepage?: string,
  private?: boolean,
  has_issues?: boolean,
  has_projects?: boolean,
  has_wiki?: boolean,
  is_template?: boolean,
};

export type GetRepoListParams = {
  orgName: string,
  type?: string,
  sort?: string,
  direction?: string,
  per_page?: number,
  page?: number,
};

export type ApiResp<SuccessT> = {
  data: SuccessT,
}

export interface IGitHubStore {
  getRepoList<SuccessT>(params: GetRepoListParams): Promise<ApiResp<SuccessT>>;

  // Необязательный пункт, т.к. требует авторизации. Понадобится в будущем
  postCreateRepo<SuccessT>(params: PostCreateRepoParams): Promise<ApiResp<SuccessT>>;
}
