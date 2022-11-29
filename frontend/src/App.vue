<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
const data: any = reactive({ todos: [] });
const description = ref("");
function addItem() {
  // se for vazio
  if (!description.value) return;
  // se for duplicado
  if (data.todos.some((item: any) => item.description === description.value))
    return;
  // se ja tiverem 5 itens não resolvidos
  if (data.todos.filter((item: any) => !item.done).length > 4) return;
  data.todos.push({ description: description.value, done: false });
  description.value = "";
}
function removeItem(item: any): void {
  data.todos.splice(data.todos.indexOf(item), 1);
}

function toggleDone(item: any) {
  item.done = !item.done;
}

onMounted(async () => {
  const response = await axios.get("http://localhost:3000/todos");
  data.todos = response.data;
});
</script>

<template>
  <div v-if="data.todos.length === 0">No Item</div>
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
