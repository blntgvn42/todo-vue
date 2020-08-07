export default {
  state: {
    todos: [
      { id: 1, todo: "todo 1", completed: true },
      { id: 2, todo: "todo 2", completed: false },
      { id: 3, todo: "todo 3", completed: true },
      { id: 4, todo: "todo 4", completed: false },
      { id: 5, todo: "todo 5", completed: true },
      { id: 6, todo: "todo 6", completed: false },
      { id: 7, todo: "todo 7", completed: true },
      { id: 8, todo: "todo 8", completed: false },
      { id: 9, todo: "todo 9", completed: true },
      { id: 10, todo: "todo 10", completed: false },
    ]
  },
  mutations: {
    completeTodo(state, payload) {
      state.todos.filter(todo => todo.id === payload.id)[0].completed = true
    },
    uncompleteTodo(state, payload) {
      state.todos.filter(todo => todo.id === payload.id)[0].completed = false
    },
    deleteTodo(state, payload) {
      state.todos = state.todos.filter(todo => todo.id !== payload.id)
    },
    changeId(state) {
      let counter = 1;
      state.todos.forEach(todo => {
        todo.id = counter;
        counter++;
      })
    },
    createTodo(state, payload) {
      state.todos = [...state.todos, { id: state.todos.length + 1, todo: payload.todo, completed: payload.completed }]
    }
  },
  getters: {
    allTodos: state => {
      return state.todos
      //
    },
    completedTodos: state => {
      return state.todos.filter(todo => todo.completed)
    },
    completedTodosCount: (state, getters) => {
      return getters.completedTodos.length
    },
    getTodosAscOrder: () => {
      return this.allTodos.sort((todo1, todo2) => todo1.id > todo2.id ? 1 : -1)
    },
    getTodosDescOrder: () => {
      return this.allTodos.sort((todo1, todo2) => todo1.id > todo2.id ? -1 : 1)
    }
  },
  actions: {
    todoCompleted({ commit }, todo) {
      commit('completeTodo', { id: todo.id })
    },
    todoUncompleted({ commit }, todo) {
      commit('uncompleteTodo', { id: todo.id })
    },
    todoDeleted({ commit }, todo) {
      commit('deleteTodo', { id: todo.id })
      commit('changeId');
    },
    todoCreated({ commit }, todo) {
      commit('createTodo', { todo: todo.todo, completed: todo.completed === "Completed" ? true : false })
    }
  },
};
