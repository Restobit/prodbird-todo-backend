import { Router, type Request, type Response } from "express";

export interface Todo {
  id: number;
  userId: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

const router = Router();

const todos: Todo[] = [
  {
    id: 1,
    userId: 1,
    text: "Learn TypeScript",
    completed: true,
    createdAt: "2026-07-22T08:30:00.000Z",
  },
  {
    id: 2,
    userId: 1,
    text: "Build Todo API",
    completed: false,
    createdAt: "2026-07-22T09:15:00.000Z",
  },
  {
    id: 3,
    userId: 2,
    text: "Write unit tests",
    completed: false,
    createdAt: "2026-07-22T10:00:00.000Z",
  },
];

// GET /todo
router.get("/", (_req: Request, res: Response) => {
  res.status(200).json(todos);
});

// GET /todo/user/1
router.get("/user/:userId", (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  if (Number.isNaN(userId)) {
    return res.status(400).json({
      message: "Invalid userId",
    });
  }

  const userTodos = todos.filter((todo) => todo.userId === userId);

  res.status(200).json(userTodos);
});

export default router;
