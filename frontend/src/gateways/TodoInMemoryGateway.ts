import ITodoGateway from "./ITodoGateway";

export default class TodoInMemoryGateway implements ITodoGateway {
  todos: any = [];
  constructor() {
    this.todos = [
      {
        id: Math.random().toString(36).slice(2, 7),
        description: "*** Memory*** - Estudar TypeScript",
        done: true,
      },
      {
        id: Math.random().toString(36).slice(2, 7),
        description: "Fazer a prova online",
        done: false,
      },
      {
        id: Math.random().toString(36).slice(2, 7),
        description: "Cortar a grama",
        done: false,
      },
    ];
  }
  getTodos(): Promise<any> {
    return this.todos;
  }
  async addItem(item: any): Promise<any> {
    await this.todos.push(item);
  }
  async updateItem(item: any): Promise<any> {
    const todo = this.todos.find((todo: any) => todo.id === item.id);
    if (todo) {
      todo.done = item.done;
    }
  }
  async removeItem(id: string): Promise<any> {
    const todo = this.todos.find((todo: any) => todo.id === id);
    if (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    }
  }
}
