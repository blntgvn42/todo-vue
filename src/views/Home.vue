<template>
  <div>
    <v-row class="mx-0 d-flex justify-space-around">
      <v-btn class="amber" v-if="!openForm" @click="openForm = !openForm">Create New Todo</v-btn>
      <v-btn class="amber" v-if="openForm" @click="openForm = !openForm">X</v-btn>
    </v-row>
    <div class="mt-5" v-show="openForm">
      <v-form @submit="submitTodo">
        <v-row>
          <v-text-field v-model="formData.todo" label="Type Todo" class="mx-0"></v-text-field>
        </v-row>
        <v-radio-group v-model="formData.completed" class="d-flex justify-space-around">
          <v-radio
            v-for="operation in todoOperations"
            :key="operation"
            :label="operation"
            :value="operation"
          ></v-radio>
        </v-radio-group>
        <v-btn block type="submit" @click.prevent="submitTodo">Create</v-btn>
      </v-form>
    </div>

    <v-row class="my-5 mx-0 teal text-center">
      <v-col>Todo Id</v-col>
      <v-col>Todo Content</v-col>
      <v-col>Todo Operations</v-col>
    </v-row>
    <v-row
      no-gutters
      v-for="todo in allTodos"
      :key="todo.id"
      class="pa-3 mb-3 text-center"
      :class="todo.completed ? 'success' : 'warning'"
    >
      <v-col>{{ todo.id }}</v-col>
      <v-col>{{ todo.todo }}</v-col>
      <v-col class="d-flex justify-space-around">
        <v-btn v-if="!todo.completed" small @click="todoCompleted(todo)">Mark as Completed</v-btn>
        <v-btn v-if="todo.completed" small @click="todoUncompleted(todo)">Mark as Uncompleted</v-btn>
        <v-btn small @click="todoDeleted(todo)">Delete Todo</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      ...mapState(["todos"]),
      todoIdOrder: true, // false => asc, true => desc
      openForm: false,
      todoOperations: ["Completed", "Uncompleted"],
      formData: { todo: "", completed: "" },
    };
  },
  methods: {
    ...mapMutations(),
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
    ...mapGetters(["allTodos", "completedTodos", "completedTodosCount"]),
  },
  watch: {},
};
</script>

<style scoped >
</style>