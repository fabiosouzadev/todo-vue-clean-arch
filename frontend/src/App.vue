<script setup lang="ts">
import { reactive, ref } from "vue";
const todos: any = reactive([
  { description: "Estudar Typescript", done: true },
  { description: "Fazer prova online", done: false },
  { description: "Cortar a grana", done: false },
]);
const description = ref("");
function addItem() {
  // se for vazio
  if (!description.value) return;
  // se for duplicado
  if (todos.some((item: any) => item.description === description.value)) return;
  // se ja tiverem 5 itens não resolvidos
  if (todos.filter((item: any) => !item.done).length > 4) return;
  todos.push({ description: description.value, done: false });
  description.value = "";
}
function removeItem(item: any): void {
  todos.splice(todos.indexOf(item), 1);
}

function toggleDone(item: any) {
  item.done = !item.done;
}
</script>

<template>
  <div v-if="todos.length === 0">No Item</div>
  <div v-for="item in todos">
    <span :style="{ 'text-decoration': item.done ? 'line-through' : '' }">
      {{ item.description }} {{ item.done }}
    </span>
    <button @click="toggleDone(item)">Done/Undone</button>
    <button @click="removeItem(item)">Remove</button>
  </div>
  <input type="text" v-model="description" @keyup.enter="addItem()" />
</template>

<style scoped></style>
