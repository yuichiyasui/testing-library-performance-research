import { InternalLink } from "@/components/InternalLink";

import type { Metadata } from "next/types";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

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

      <table className="table">
        <thead className="bg-gray-50">
          <tr>
            <th className="whitespace-nowrap w-0">
              <label>
                <span className="sr-only">全てのタスクを選択</span>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>タスク名</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <label>
                <span className="sr-only">タスク1を選択</span>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>
              <InternalLink href="/tasks/edit/1">タスク1</InternalLink>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
