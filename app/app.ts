import { Application } from "abc";
import {
  geeting,
  getSingleToDo,
  getToDoList,
  createToDoTask,
  editToDoTask,
  deleteToDoTask,
} from "./handler/todo.ts";

const app = new Application();

app
  .get("/", geeting)
  .get("/todo/:todoId", getSingleToDo)
  .get("/todos", getToDoList)
  .post("/todo", createToDoTask)
  .put("/todo/:todoId", editToDoTask)
  .delete("/todo/:todoId", deleteToDoTask);

export default app;
