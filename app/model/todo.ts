import type { ObjectId } from "mongo";

export interface ToDo {
  _id: ObjectId;
  title: string;
  content: string;
  timestamp: Date;
}
