<script setup lang="ts">
import { inject, onMounted, reactive, ref } from "vue";
import ITodoGateway from "../gateways/ITodoGateway";
const data: any = reactive({ todos: [] });
const description = ref("");
const todoGateway = inject("todoGateway") as ITodoGateway;

async function addItem(): Promise<void> {
  // se for vazio
  if (!description.value) return;
  // se for duplicado
  if (data.todos.some((item: any) => item.description === description.value))
    return;
  // se ja tiverem 5 itens não resolvidos
  if (data.todos.filter((item: any) => !item.done).length > 4) return;
  const item = {
    id: Math.random().toString(36).slice(2, 7),
    description: description.value,
    done: false,
  };
  data.todos.push(item);
  description.value = "";
  await todoGateway.addItem(item);
}

async function removeItem(item: any): Promise<void> {
  data.todos.splice(data.todos.indexOf(item), 1);
  await todoGateway.removeItem(item.id);
}

async function toggleDone(item: any) {
  item.done = !item.done;
  await todoGateway.updateItem(item);
}

function getCompleted() {
  const total = data.todos.length;
  if (total === 0) return 0;
  const done = data.todos.filter((item: any) => item.done).length;
  return Math.round((done / total) * 100);
}

onMounted(async () => {
  data.todos = await todoGateway.getTodos();
});
</script>

<template>
  <div v-if="data.todos.length === 0">No Item</div>
  <span class="completed">{{ getCompleted() }}%</span>
  <div v-for="item in data.todos">
    <span :style="{ 'text-decoration': item.done ? 'line-through' : '' }">
      {{ item.description }} {{ item.done }}
    </span>
    <button @click="toggleDone(item)">Done/Undone</button>
    <button @click="removeItem(item)">Remove</button>
  </div>
  <input type="text" v-model="description" @keyup.enter="addItem()" />
</template>

<style scoped></style>
