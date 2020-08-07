<template>
  <div>
    <div class="d-flex justify-space-around">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">New Todo</v-btn>
        </template>
        <v-form @submit="submitTodo">
          <v-card>
            <v-card-title class="headline grey lighten-2">New Todo</v-card-title>
            <v-card-text>
              <v-text-field v-model="formData.todo" label="Type todo" required></v-text-field>
              <v-radio-group v-model="formData.completed">
                <v-radio
                  v-for="operation in todoOperations"
                  :key="operation"
                  :label="operation"
                  :value="operation"
                ></v-radio>
              </v-radio-group>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                block
                class="blue text--white text-lighten-1"
                text
                @click="submitTodo(); dialog = false;"
              >I accept</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
      <v-btn @click="toggleTable">Show Todos</v-btn>
    </div>
    <v-simple-table v-if="showTable">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">Id</th>
            <th class="text-center">Todo</th>
            <th class="text-center">Is completed ?</th>
            <th class="text-center">Operations</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="todo in allTodos"
            :key="todo.id"
            class="white--text text-lighten-1"
            :class="todo.completed ? 'success' : 'warning'"
          >
            <td>{{ todo.id }}</td>
            <td>{{ todo.todo }}</td>
            <td>{{ todo.completed ? "Completed" : "Not Completed" }}</td>
            <td class="d-flex justify-space-around align-center">
              <v-btn small @click="todoCompleted(todo)">Mark as Completed</v-btn>
              <v-btn small @click="todoUncompleted(todo)">Mark as Uncompleted</v-btn>
              <v-btn small @click="todoDeleted(todo)">Delete Todo</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      todos: [],
      todoOperations: ["Completed", "Uncompleted"],
      dialog: false,
      showTable: true,
      formData: {
        todo: "",
        completed: "",
      },
    };
  },
  methods: {
    ...mapActions([
      "todoCreated",
      "todoCompleted",
      "todoUncompleted",
      "todoDeleted",
    ]),
    toggleTable() {
      this.showTable = !this.showTable;
    },
    submitTodo() {
      this.todoCreated(this.formData);
      this.formData.todo = "";
      this.formData.completed = "";
    },
  },
  computed: {
    allTodos() {
      return this.$store.getters.allTodos;
    },
    completedTodos() {
      return this.$store.getters.completedTodos;
    },
    completedTodosCount() {
      return this.$store.getters.completedTodosCount;
    },
  },
  watch: {},
};
</script>

<style scoped >
</style>