import { Router, type Request, type Response } from "express";
import db from "../db/index.ts";
import todoMock from "../mock/todo.mock.ts";
import { SQL_MODE } from "../constants.ts";
import type { Todo } from "./types.ts";

const router = Router();

db.connect((err) => {
  if (err) throw err;
  console.log("✅ MySQL Connected!");
  console.log(`SQL_MODE: ${SQL_MODE}`);
});

// GET /todo MOCK
router.get("/", (_req: Request, res: Response) => {
  res.status(200).json(todoMock);
});

// GET /todo/user/1
router.get("/user/:userId", (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  if (Number.isNaN(userId)) {
    return res.status(400).json({
      message: "Invalid userId",
    });
  }

  if (SQL_MODE === "SERVER") {
    db.query("SELECT * FROM todos WHERE user_id = ?", [userId], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      console.log("results", results);

      if (Array.isArray(results) && results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const userTodos: Todo[] = Array.isArray(results)
        ? results.map((todo: any) => ({
            id: todo.id as number,
            userId: todo.user_id as number,
            content: todo.content as string,
            completed: todo.completed as number,
            createdAt: todo.created_at as string,
          }))
        : [];
      res.status(200).json(userTodos);
    });
  }

  if (SQL_MODE === "MOCK") {
    const userTodos = todoMock.filter((todo) => todo.userId === userId);
    res.status(200).json(userTodos);
  }
});

export default router;
