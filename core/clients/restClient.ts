import { APIRequestContext, expect } from '@playwright/test';
import { validateUserGetV1 } from '../contracts/validators/user.get.v1';

export class RestClient {
  constructor(private readonly request: APIRequestContext, private readonly baseUrl: string) {}

  async get<T>(path: string, status = 200): Promise<T> {
    const r = await this.request.get(`${this.baseUrl}${path}`);
    await expect(r).toHaveStatus(status);
    return (await r.json()) as T;
  }

  async getUser(id: string) {
    const data = await this.get(`/users/${id}`);
    validateUserGetV1(data);
    return data;
  }
}


