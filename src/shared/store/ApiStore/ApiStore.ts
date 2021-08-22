import * as qs from 'qs';
import { ApiResponse, IApiStore, RequestParams } from './types';

export default class ApiStore implements IApiStore {
  baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
    try {
      let url: string;
      let body: string | undefined;

      url = `${this.baseUrl}${params.endpoint}`;
      body = JSON.stringify(params.data);
      if (params.method === 'GET') {
        let query = qs.stringify(params.data);
        if (query) query = `?${query}`;
        url = `${url}${query}`;
        body = undefined;
      }
      const response = await fetch(url, {
        method: params.method,
        headers: params.headers,
        body,
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
