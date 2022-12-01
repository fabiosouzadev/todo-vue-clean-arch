import TodoList from "../src/entities/TodoList";

test("Deve criar uma TodoList", function () {
  const todoList = new TodoList();
  todoList.addItem("a");
  todoList.addItem("b");
  todoList.addItem("c");
  expect(todoList.getCompleted()).toBe(0);
});

test("Deve criar uma TodoList com 3 itens e 2 done", function () {
  const todoList = new TodoList();
  todoList.addItem("a");
  todoList.addItem("b");
  todoList.addItem("c");
  let itemA = todoList.getItem("a");
  if (itemA) todoList.toggleDone(itemA);
  let itemB = todoList.getItem("b");
  if (itemB) todoList.toggleDone(itemB);
  expect(todoList.getCompleted()).toBe(67);
});
test("Deve criar uma TodoList com 3 itens e deletar 1", function () {
  const todoList = new TodoList();
  todoList.addItem("a");
  todoList.addItem("b");
  todoList.addItem("c");
  let itemC = todoList.getItem("c");
  if (itemC) todoList.removeItem(itemC);
  expect(todoList.items).toHaveLength(2);
});
