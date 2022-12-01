<script setup lang="ts">
import { inject, onMounted, reactive } from "vue";
import Observer from "../entities/Observer";
import TodoList from "../entities/TodoList";
import ITodoGateway from "../gateways/ITodoGateway";
import TodoListComponent from "./TodoListComponent.vue";

const data: any = reactive({ todoList: new TodoList() });
const todoGateway = inject("todoGateway") as ITodoGateway;

onMounted(async () => {
  const todoList = await todoGateway.getTodos();

  todoList.register(
    new Observer("addItem", async function (item: any) {
      await todoGateway.addItem(item);
    })
  );

  todoList.register(
    new Observer("removeItem", async function (item: any) {
      await todoGateway.removeItem(item.id);
    })
  );

  todoList.register(
    new Observer("toggleDone", async function (item: any) {
      await todoGateway.updateItem(item);
    })
  );

  data.todoList = todoList;
});
</script>

<template>
  <TodoListComponent :todo-list="data.todoList"></TodoListComponent>
</template>

<style scoped></style>
