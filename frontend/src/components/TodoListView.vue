<script setup lang="ts">
import { inject, onMounted, reactive, ref } from "vue";
import Observer from "../entities/Observer";
import TodoList from "../entities/TodoList";
import ITodoGateway from "../gateways/ITodoGateway";
const data: any = reactive({ todoList: new TodoList() });
const description = ref("");
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
  <div v-if="data.todoList.items.length === 0">No Item</div>
  <span class="completed">{{ data.todoList.getCompleted() }}%</span>
  <div v-for="item in data.todoList.items">
    <span :style="{ 'text-decoration': item.done ? 'line-through' : '' }">
      {{ item.description }} {{ item.done }}
    </span>
    <button @click="data.todoList.toggleDone(item)">Done/Undone</button>
    <button @click="data.todoList.removeItem(item)">Remove</button>
  </div>
  <input
    type="text"
    v-model="description"
    @keyup.enter="data.todoList.addItem(description)"
  />
</template>

<style scoped></style>
