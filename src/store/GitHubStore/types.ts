/** Интерфейс класса для работы с GitHub API
 * названия getSomeData и postSomeData
 * (а также типов GetSomeDataParams и PostSomeDataPrams)
 * поменяйте в соответствии с выполняемым запросом.
 * Выберите любой запрос из публичного API GitHub.
 */

export type PostCreateRepoParams = {
  org: string,
  bodyData: object,
};

export type GetRepoListParams = {
  org: string,
  queryData: object,
};

export type ApiResp<SuccessT> = {
  data: SuccessT,
}

export interface IGitHubStore {
  getRepoList<SuccessT>(params: GetRepoListParams): Promise<ApiResp<SuccessT>>;

  // Необязательный пункт, т.к. требует авторизации. Понадобится в будущем
  postCreateRepo<SuccessT>(params: PostCreateRepoParams): Promise<ApiResp<SuccessT>>;
}
