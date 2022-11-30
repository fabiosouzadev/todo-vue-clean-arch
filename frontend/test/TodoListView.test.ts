import { mount } from "@vue/test-utils";
import TodoListViewVue from "src/components/TodoListView.vue";
import TodoInMemoryGateway from "../src/gateways/TodoInMemoryGateway";

function sleep(mili: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, mili);
  });
}
test("Deve testar a tela de todo list", async function () {
  const todoGateway = new TodoInMemoryGateway();
  const wrapper = mount(TodoListViewVue, {
    global: {
      provide: {
        todoGateway,
      },
    },
  });
  await sleep(100);
  console.log(wrapper.html());
  expect(wrapper.get(".completed").text()).toBe("33%");
});
