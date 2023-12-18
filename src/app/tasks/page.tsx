import type { Metadata } from "next/types";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TaskList } from "./_components/TaskList";

export const metadata: Metadata = {
  title: "タスク一覧",
};

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        list={[
          { name: "トップ", href: "/" },
          { name: "タスク一覧", href: "/tasks" },
        ]}
      />
      <h1 className="text-3xl font-bold my-5">タスク一覧</h1>
      <Link href="/tasks/create" className="btn btn-primary mb-4">
        タスクの作成
      </Link>

      <TaskList />
    </main>
  );
}
