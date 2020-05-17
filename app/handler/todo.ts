import { HandlerFunc, Context } from "https://deno.land/x/abc/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.6.0/mod.ts";
import db from "../../config/mongodb.ts"
import { ToDo } from "../model/todo.ts"

export const geeting: HandlerFunc = (ctx: Context) => {
    ctx.json({
        message: "Hello, Welcome to Todo API with deno 🦕."
    }, 200);
}

export const getSingleToDo: HandlerFunc = async (ctx: Context) => {
  try {
    const todoId = ObjectId(ctx.params.todoId);
    const result = await db.collection("todos").findOne({ _id: todoId });
    if (!Object.keys(result).length) {
      return ctx.json({
        message: "There are no todo item!"
      }, 200)
    }
    return ctx.json(result, 200)
  } catch (err) {
    console.log(err);
    return ctx.json({
      message: err.message || err
    }, 400);
  }
}

export const getToDoList: HandlerFunc = async (ctx: Context) => {
  try {
    const limit = Number(ctx.queryParams.limit) || 0
    const pageNumber = Number(ctx.queryParams.page_number) || 0
    const skip = pageNumber > 0 ? limit * (pageNumber - 1) : 0
    const length = await db.collection("todos").count()
    const results = await db.collection("todos").find({}, {
      limit: Number(limit),
      skip: Number(skip)
    }) as ToDo[]
    return ctx.json({
     results,
     length
    }, 200);
  } catch (err) {
    console.log(err);
    return ctx.json({
      message: err.message || err
    }, 400);
  }
}

export const createToDoTask: HandlerFunc = async (ctx: Context) => {
  try {
    const body = await ctx.body<ToDo>();
    const result = await db.collection("todos").insertOne({
      title: body.title || '',
      content: body.content || '',
      timestamp: new Date()
    });
    return ctx.json({
      code: "todo/create/sucess",
      _id: result.$oid
    }, 200);
  } catch (err) {
    console.log(err);
    return ctx.json({
      message: err.message || err
    }, 400);
  }
}

export const editToDoTask: HandlerFunc = async (ctx: Context) => {
  try {
    const todoId = ObjectId(ctx.params.todoId);
    const body = await ctx.body<ToDo>();
    const result = await db.collection("todos").updateOne({ _id: todoId }, {
      title: body.title || '',
      content: body.content || '',
      timestamp: new Date()
    })
    if (result.matchedCount <= 0) {
      return ctx.json({
        message: "There are no todo item!"
      }, 204);
    }
    return ctx.json({
      code: "todo/update/sucess",
      _id: todoId.$oid
    }, 200);
  } catch (err) {
    console.log(err);
    return ctx.json({
      message: err.message || err
    }, 400);
  }
}

export const deleteToDoTask: HandlerFunc = async (ctx: Context) => {
  try {
    const todoId = ObjectId(ctx.params.todoId);
    const deleteCount = await db.collection("todos").deleteOne({ _id: todoId });
    if (deleteCount <= 0) {
      return ctx.json({
        message: "There are no todo item!"
      }, 204);
    }
    return ctx.json({
      code: "todo/delete/success",
      _id: todoId.$oid
    }, 200);
  } catch (err) {
    console.log(err);
    return ctx.json({
      message: err.message || err
    }, 400);
  }
}
