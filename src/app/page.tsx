import { InternalLink } from "@/components/InternalLink";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-3xl mb-5 font-bold">My App</h1>
      <nav>
        <ul>
          <li>
            <InternalLink href="/tasks">タスク一覧</InternalLink>
          </li>
        </ul>
      </nav>
    </main>
  );
}
