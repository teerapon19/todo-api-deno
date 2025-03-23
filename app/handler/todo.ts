import type { HandlerFunc, Context } from "abc";
import { ObjectId } from "mongo";
import db from "../../config/mongodb.ts";
import { ToDo } from "../model/todo.ts";

export const geeting: HandlerFunc = (ctx: Context) => {
  ctx.json(
    {
      message: "Hello, Welcome to Todo API with deno 🦕.",
    },
    200
  );
};

export const getSingleToDo: HandlerFunc = async (ctx: Context) => {
  try {
    const todoId = new ObjectId(ctx.params.todoId);
    const result = await db.collection("todos").findOne({ _id: todoId });
    if (!result) {
      throw "There are no todo item!";
    }
    return ctx.json(result, 200);
  } catch (err) {
    return ctx.json(
      {
        message: err,
      },
      400
    );
  }
};

export const getToDoList: HandlerFunc = async (ctx: Context) => {
  try {
    const limit = Number(ctx.queryParams.limit) || 0;
    const pageNumber = Number(ctx.queryParams.page_number) || 0;
    const skip = pageNumber > 0 ? limit * (pageNumber - 1) : 0;
    const collection = db.collection<ToDo>("todos");
    const length = await collection.countDocuments();
    const results = await collection
      .find(
        {},
        {
          limit: Number(limit),
          skip: Number(skip),
        }
      )
      .toArray();
    return ctx.json(
      {
        results,
        length,
      },
      200
    );
  } catch (err) {
    return ctx.json(
      {
        message: err,
      },
      400
    );
  }
};

export const createToDoTask: HandlerFunc = async (ctx: Context) => {
  try {
    const body = (await ctx.request.body()) as ToDo;
    const result = await db.collection("todos").insertOne({
      title: body.title || "",
      content: body.content || "",
      timestamp: new Date(),
    });
    return ctx.json(
      {
        code: "todo/create/success",
        _id: result,
      },
      201
    );
  } catch (err) {
    return ctx.json(
      {
        message: err,
      },
      400
    );
  }
};

export const editToDoTask: HandlerFunc = async (ctx: Context) => {
  try {
    const todoId = new ObjectId(ctx.params.todoId);
    const body = (await ctx.request.body()) as ToDo;
    const result = await db.collection("todos").updateOne(
      { _id: todoId },
      {
        title: body.title || "",
        content: body.content || "",
        timestamp: new Date(),
      }
    );
    if (result.matchedCount <= 0) {
      throw "There are no todo item!";
    }
    return ctx.json(
      {
        code: "todo/update/sucess",
        _id: todoId,
      },
      200
    );
  } catch (err) {
    return ctx.json(
      {
        message: err,
      },
      400
    );
  }
};

export const deleteToDoTask: HandlerFunc = async (ctx: Context) => {
  try {
    const todoId = new ObjectId(ctx.params.todoId);
    const deleteResult = await db
      .collection("todos")
      .deleteOne({ _id: todoId });
    if (deleteResult.deletedCount <= 0) {
      throw "There are no todo item!";
    }
    return ctx.json(
      {
        code: "todo/delete/success",
        _id: todoId,
      },
      200
    );
  } catch (err) {
    return ctx.json(
      {
        message: err,
      },
      500
    );
  }
};
