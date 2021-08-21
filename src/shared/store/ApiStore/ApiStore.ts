import qs from 'qs';
import { ApiResponse, IApiStore, RequestParams } from './types';

export default class ApiStore implements IApiStore {
  baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
    try {
      let url: string;
      url = `${this.baseUrl}${params.endpoint}`;
      if (params.method === 'GET') {
        const query = qs.stringify(params.data);
        url = `${url}${query}`;
      }
      const response = await fetch(url, {
        method: params.method,
        headers: params.headers,
        body: JSON.stringify(params.data),
      });
      const data = await response.json();
      return {
        success: true,
        data,
        status: response.status,
      };
    } catch (e) {
      return {
        success: false,
        data: e,
        status: 500,
      };
    }
  }
}
