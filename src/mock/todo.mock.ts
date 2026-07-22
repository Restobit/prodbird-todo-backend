import type { Todo } from "../routes/types.ts";

const todoMock: Todo[] = [
  {
    id: 1,
    userId: 1,
    content: "Learn TypeScript",
    completed: 1,
    createdAt: "2026-07-22T08:30:00.000Z",
  },
  {
    id: 2,
    userId: 1,
    content: "Build Todo API",
    completed: 0,
    createdAt: "2026-07-22T09:15:00.000Z",
  },
  {
    id: 3,
    userId: 2,
    content: "Write unit tests",
    completed: 0,
    createdAt: "2026-07-22T10:00:00.000Z",
  },
];

export default todoMock;
