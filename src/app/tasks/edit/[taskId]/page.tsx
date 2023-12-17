import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TaskForm } from "../../_components/TaskForm";

type PageParams = {
  taskId: string;
};

export default function Page({ taskId }: PageParams) {
  return (
    <main>
      <Breadcrumbs
        list={[
          { name: "トップ", href: "/" },
          { name: "タスク一覧", href: "/tasks" },
          { name: "タスクの編集", href: `/tasks/edit/${taskId}` },
        ]}
      />
      <h1 className="text-3xl font-bold my-5">タスクの編集</h1>
      <TaskForm />
    </main>
  );
}
