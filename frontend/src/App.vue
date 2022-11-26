<script setup lang="ts">
import { reactive, ref } from 'vue';

const todos: any = reactive([
  { description: "Estudar Typescript", done: true },
  { description: "Fazer prova online", done: false },
  { description: "Cortar a grana", done: false },
]);
const description = ref("");
function addItem (){
    todos.push({ description: description.value, done: false});
    description.value = "";
}
function removeItem(item: any): void{
    todos.splice(todos.indexOf(item), 1);
}
</script>

<template>
  <div v-for="item in todos">
    <span :style="{ 'text-decoration': item.done ? 'line-through' : '' }">{{ item.description }} {{ item.done }}</span>
    <button @click="removeItem(item)">Remove</button>
  </div>
  <input type="text" v-model="description" @keyup.enter="addItem()">
</template>

<style scoped></style>
