import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import TodoHttpGateway from "./gateways/TodoHttpGateway";
import AxiosAdapter from "./infra/AxiosAdapter";

const app = createApp(App);
const httpClient = new AxiosAdapter();
const todoGateway = new TodoHttpGateway(httpClient, "http://localhost:3000");
app.provide("todoGateway", todoGateway);
app.mount("#app");
