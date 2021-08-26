import * as qs from 'qs';
import {
  ApiResponse, HTTPMethod, IApiStore, RequestParams, StatusHTTP,
} from './types';

export default class ApiStore implements IApiStore {
  baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
    try {
      let url: string = `${this.baseUrl}${params.endpoint}`;
      let body: string | undefined;

      if (params.method === HTTPMethod.GET) {
        const query = qs.stringify(params.data);
        url = `${url}${query ? `?${query}` : ''}`;
      } else {
        body = JSON.stringify(params.data);
      }
      const response = await fetch(url, {
        method: params.method,
        headers: params.headers,
        body,
      });
      const data = await response.json();
      if (response.ok) {
        return {
          success: true,
          data,
          status: response.status,
        };
      }
      return {
        success: false,
        data,
        status: response.status,
      };
    } catch (e) {
      return {
        success: false,
        data: e,
        status: StatusHTTP.UNEXPECTED_ERROR,
      };
    }
  }
}
