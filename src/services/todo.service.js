const BASE_URL = 'http://localhost:3001'

export async function getTodos() {
  const response = await fetch(`${BASE_URL}/todos`)

  return await response.json()
}

export async function createTodo(name) {
  const respose = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    body: JSON.stringify({ name, done: false }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return await respose.json()
}

export async function deleteTodo(id) {
  const respose = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return await respose.json()
}

export async function updateTodo(id, data) {
  const respose = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return await respose.json()
}
