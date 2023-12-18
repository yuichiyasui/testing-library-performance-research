import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TaskForm } from "../_components/TaskForm";

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        list={[
          { name: "トップ", href: "/" },
          { name: "タスク一覧", href: "/tasks" },
          { name: "タスクの作成", href: "/tasks/create" },
        ]}
      />
      <h1 className="text-3xl font-bold my-5">タスクの作成</h1>
      <TaskForm isEdit={false} />
    </main>
  );
}
