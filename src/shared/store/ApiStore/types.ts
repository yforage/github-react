enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export type RequestParams<ReqT> = {
  method: HTTPMethod;
  endpoint: string;
  headers: Record<string, string>;
  /**
  * Объект с данными запроса.
  * - Для GET-запроса данные превращаются в query-строку и добавляются в endpoint
  * Для POST-запроса данные преобразуются к формату JSON и добавляются в тело запроса
  * */
  data: ReqT;
};

// Перечисление статусов ответа
enum StatusHTTP {
  SUCCESS = 200,
  FAILURE = 500,
}

// Ответ API
export type ApiResponse<SuccessT, ErrorT> =
    | {
      success: true;
      data: SuccessT;
      status: StatusHTTP;
    }
    | {
      success: false;
      data: ErrorT;
      status: StatusHTTP;
    };

// Интерфейс для класса, с помощью которого можно делать запросы к API
export interface IApiStore {
  readonly baseUrl: string;

  // Метод, с помощью которого делается запрос. TODO: реализовать в классе ApiStore
  request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>>
}
