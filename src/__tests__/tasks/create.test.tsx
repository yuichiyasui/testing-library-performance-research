import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../custom-render";
import TaskCreationPage from "@/app/tasks/create/page";
import Layout from "@/app/tasks/layout";
import { setupServer } from "msw/node";
import { env } from "@/constants/env";
import { HttpResponse, http } from "msw";

const createTaskMutationInterceptor = vi.fn();
const server = setupServer(
  http.post(`${env.taskApiUrl}/tasks`, ({ request }) => {
    if (request.body === null) {
      createTaskMutationInterceptor();
      return HttpResponse.json({});
    }

    const reader = request.body.getReader();
    reader.read().then((result) => {
      const decoder = new TextDecoder("utf-8");
      const value = decoder.decode(result.value);
      const json = JSON.parse(value);
      createTaskMutationInterceptor(json);
    });

    return HttpResponse.json({});
  }),
);

const mockRouter = {
  push: vi.fn(),
};

vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

beforeAll(() => server.listen());

afterEach(() => {
  vi.clearAllMocks();
  server.resetHandlers();
});

afterAll(() => server.close());

test("タスク作成画面が表示される", async () => {
  renderWithProviders(
    <Layout>
      <TaskCreationPage />
    </Layout>,
  );

  expect(
    screen.getByRole("heading", { level: 1, name: "タスクの作成" }),
  ).toBeInTheDocument();
  const titleField = screen.getByRole("textbox", { name: "タスク名" });
  expect(titleField).toBeInTheDocument();
  expect(titleField).toHaveValue("");

  const descriptionField = screen.getByRole("textbox", { name: "内容" });
  expect(descriptionField).toBeInTheDocument();
  expect(descriptionField).toHaveValue("");

  expect(screen.getByRole("button", { name: "作成" })).toBeInTheDocument();
});

test("タスク作成に成功した場合タスク一覧画面に遷移する", async () => {
  const { user } = renderWithProviders(
    <Layout>
      <TaskCreationPage />
    </Layout>,
  );

  const titleField = screen.getByRole("textbox", { name: "タスク名" });
  await user.type(titleField, "タスク1");
  expect(titleField).toHaveValue("タスク1");

  const descriptionField = screen.getByRole("textbox", { name: "内容" });
  await user.type(descriptionField, "タスク1の内容");
  expect(descriptionField).toHaveValue("タスク1の内容");

  screen.getByRole("button", { name: "作成" }).click();

  await waitFor(() => {
    expect(createTaskMutationInterceptor).toHaveBeenCalledTimes(1);
  });
  expect(createTaskMutationInterceptor).toHaveBeenCalledWith({
    description: "タスク1の内容",
    title: "タスク1",
  });

  expect(mockRouter.push).toHaveBeenCalledWith("/tasks");
});

test("タスク名が入力されていない場合エラーが表示される", async () => {
  renderWithProviders(
    <Layout>
      <TaskCreationPage />
    </Layout>,
  );

  screen.getByRole("button", { name: "作成" }).click();

  expect(
    await screen.findByText("タスク名が入力されていません"),
  ).toBeInTheDocument();
  expect(createTaskMutationInterceptor).not.toHaveBeenCalled();
});

test("各フィールドの入力文字数が上限を超過している場合エラーが表示される", async () => {
  const { user } = renderWithProviders(
    <Layout>
      <TaskCreationPage />
    </Layout>,
  );

  const titleField = screen.getByRole("textbox", { name: "タスク名" });
  await user.type(titleField, "a".repeat(31));

  const descriptionField = screen.getByRole("textbox", { name: "内容" });
  await user.type(descriptionField, "a".repeat(1001));

  screen.getByRole("button", { name: "作成" }).click();

  const titleError = await screen.findByText(
    "タスク名は30文字以内で入力してください",
  );
  expect(titleError).toBeInTheDocument();
  const descriptionError = await screen.findByText(
    "タスクの内容は1000文字以内で入力してください",
  );
  expect(descriptionError).toBeInTheDocument();
  expect(createTaskMutationInterceptor).not.toHaveBeenCalled();
});

test("タスク作成に失敗した場合エラーが表示される", async () => {
  server.use(
    http.post(`${env.taskApiUrl}/tasks`, () => {
      createTaskMutationInterceptor();
      return HttpResponse.error();
    }),
  );

  const { user } = renderWithProviders(
    <Layout>
      <TaskCreationPage />
    </Layout>,
  );

  const titleField = screen.getByRole("textbox", { name: "タスク名" });
  await user.type(titleField, "タスク1");

  const descriptionField = screen.getByRole("textbox", { name: "内容" });
  await user.type(descriptionField, "タスク1の内容");

  screen.getByRole("button", { name: "作成" }).click();

  await waitFor(() => {
    expect(createTaskMutationInterceptor).toHaveBeenCalledTimes(1);
  });

  const rootError = screen.getByRole("alert");
  await waitFor(() => {
    expect(rootError).toBeInTheDocument();
  });
  expect(rootError).toHaveTextContent("エラーが発生しました");

  expect(mockRouter.push).not.toHaveBeenCalled();
});
