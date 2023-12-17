import { InternalLink } from "@/components/InternalLink";

export default function Page() {
  return (
    <main>
      <h1>タスク一覧</h1>

      <InternalLink href="/tasks/create">タスクの作成</InternalLink>

      <ul>
        <li>
          <InternalLink href="/tasks/1">タスク1</InternalLink>
        </li>
      </ul>
    </main>
  );
}
