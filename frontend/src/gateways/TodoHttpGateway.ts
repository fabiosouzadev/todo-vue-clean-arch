import IHttpClient from "../infra/IHttpClient";
import ITodoGateway from "./ITodoGateway";

export default class TodoHttpGateway implements ITodoGateway {
  todos: any = [];
  constructor(readonly httpClient: IHttpClient, readonly baseUrl: string) {}
  async getTodos(): Promise<any> {
    return (this.todos = this.httpClient.get(`${this.baseUrl}/todos`));
  }
  async addItem(item: any): Promise<any> {
    await this.httpClient.post(`${this.baseUrl}/todos`, item);
  }
  async updateItem(item: any): Promise<any> {
    await this.httpClient.put(`${this.baseUrl}/todos`, item);
  }
  async removeItem(id: string): Promise<any> {
    await this.httpClient.delete(`${this.baseUrl}/todos/${id}`);
  }
}
