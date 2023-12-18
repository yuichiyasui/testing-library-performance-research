/**
 * Generated by orval v6.22.1 🍺
 * Do not edit manually.
 * Task API
 * OpenAPI spec version: 1.0.0
 */
import { HttpResponse, delay, http } from "msw";

export const getGetTasksMock = () => [
  { id: 1, title: "Task 1", description: "Description 1", done: false },
  { id: 2, title: "Task 2", description: "Description 2", done: true },
];

export const getCreateTaskMock = () => ({
  id: 1,
  title: "Task 1",
  description: "Description 1",
  done: false,
});

export const getGetTaskMock = () => ({
  id: 1,
  title: "Task 1",
  description: "Description 1",
  done: false,
});

export const getUpdateTaskMock = () => ({
  id: 1,
  title: "Task 1",
  description: "Description 1",
  done: false,
});

export const getTaskAPIMock = () => [
  http.get("http://localhost:4010/tasks", async () => {
    await delay(0);
    return new HttpResponse(JSON.stringify(getGetTasksMock()), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  http.post("http://localhost:4010/tasks", async () => {
    await delay(0);
    return new HttpResponse(JSON.stringify(getCreateTaskMock()), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  http.get("http://localhost:4010/tasks/:taskId", async () => {
    await delay(0);
    return new HttpResponse(JSON.stringify(getGetTaskMock()), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  http.put("http://localhost:4010/tasks/:taskId", async () => {
    await delay(0);
    return new HttpResponse(JSON.stringify(getUpdateTaskMock()), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  http.delete("http://localhost:4010/tasks/:taskId", async () => {
    await delay(0);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
];
