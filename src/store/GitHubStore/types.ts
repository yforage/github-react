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



export interface IGitHubStore {
  getRepoList(params: GetRepoListParams): Promise<ApiResp<GetRepoListResp>>;

  // Необязательный пункт, т.к. требует авторизации. Понадобится в будущем
  // postCreateRepo(params: PostCreateRepoParams): Promise<ApiResp<PostCreateRepoResp>>;
}
