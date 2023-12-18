import { renderWithProviders } from "./custom-render";
import TasksPage from "@/app/tasks/page";
import Layout from "@/app/tasks/layout";
import { screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { getTaskAPIMock } from "@/api/__generated__/task-api.msw";

const server = setupServer(...getTaskAPIMock());

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test("タスク一覧ページが表示されること", async () => {
  renderWithProviders(
    <Layout>
      <TasksPage />
    </Layout>,
  );

  expect(
    screen.getByRole("heading", { level: 1, name: "タスク一覧" }),
  ).toBeInTheDocument();
  const taskCreationLink = screen.getByRole("link", { name: "タスクの作成" });
  expect(taskCreationLink).toBeInTheDocument();
  expect(taskCreationLink).toHaveAttribute("href", "/tasks/create");

  expect(screen.getByRole("table")).toBeInTheDocument();
  expect(
    screen.getByRole("columnheader", { name: "タスク名" }),
  ).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByRole("link", { name: "タスク1" })).toBeInTheDocument();
  });
  expect(screen.getByRole("link", { name: "タスク2" })).toBeInTheDocument();
});
