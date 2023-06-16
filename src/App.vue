<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import * as API from './services/todo.service'
const todos = ref([])
const todoName = ref('')

const getTodos = computed(() => {
  return [...todos.value].sort((a, z) => a.done - z.done)
})

const addTodo = async () => {
  const data = await API.createTodo(todoName.value)
  todos.value.unshift(data)

  todoName.value = ''
}

const updateTodo = async (todo) => {
  const data = await API.updateTodo(todo.id, { ...todo, done: !todo.done })

  todos.value = todos.value.map((todo) => {
    if (todo.id === data.id) {
      return {
        ...todo,
        ...data
      }
    }
    return todo
  })
}

const deleteTodo = async (id) => {
  await API.deleteTodo(id)
  todos.value = todos.value.filter((todo) => todo.id !== id)
}

onBeforeMount(async () => {
  todos.value = (await API.getTodos()).reverse()
})
</script>

<template>
  <div>
    <h1>Todos</h1>
    <input
      type="text"
      v-model="todoName"
      @keyup.enter="addTodo"
      aria-label="Add a new Todo"
      placeholder="Add a new Todo"
    />
    <ul>
      <li v-for="todo of getTodos" :key="todo.id">
        <span :class="{ done: todo.done }" @click="() => updateTodo(todo)">
          {{ todo.name }}
        </span>

        <button @click="() => deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  text-decoration: underline;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-inline: auto;
  max-width: 500px;
  margin-bottom: 8px;
  color: white;
  padding: 8px 16px;
  border: 1px solid white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
li span {
  flex: 1;
}

li button {
  margin-left: 16px;
  background-color: #e74c3c;
  color: white;
  border-radius: 8px;
  padding: 12px;
  border: 0;
}

input {
  width: 100%;
  padding: 1rem;
  border-radius: 0.4rem;
  border: 1px solid #fd9644;
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.done {
  text-decoration: line-through;
}
</style>
